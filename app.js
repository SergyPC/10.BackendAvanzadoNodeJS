var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

/**
 * app es la instancia de Express
 */
var app = express(); //Definimos la aplicación de Express

// conectar a la base de datos
require('./lib/connectMongoose');

/**
 * Configuramos la aplicación
 */
// view engine setup (utilizando ejs)
//app.set('views', path.join(__dirname, 'views')); //Aquí le decimos a Express que cuando tenga que renderizar una vista, las vistas están en la carpeta ./views/
//app.set('view engine', 'ejs'); // Y que esas vistas están estructuradas con el motor de vistas ejs (También llamado motor de plantillas)

// view engine setup utilizando html
app.set('views', path.join(__dirname, 'views')); //Aquí le decimos a Express que cuando tenga que renderizar una vista, las vistas están en la carpeta ./views/
app.set('view engine', 'html'); // Y que esas vistas están estructuradas con el motor de vistas html (También llamado motor de plantillas)
app.engine('html', require('ejs').__express); //Definimos un nuevo motor de vistas html

// middlewares:
app.use(logger('dev')); //Log
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Utilizamos en Postman (POST, PUT) urlencoded porque nuestra aplicación tenemos configurado un middleware que mira el body de una petición y parsea ese formato urlencoded y lo mete en req.body para poder utilizarlo comodamente.
app.use(cookieParser()); //Parsea las cookies
app.use(express.static(path.join(__dirname, 'public'))); //Servir ficheros estáticos
// app.use('/pdf', express.static('d:/pdfs'));

// Creamos una variable global de vistas
app.locals.title = 'NodePOP';
//app.locals.tokenJWT = 'hola';

/**
 * Setup de i18n
 * Le ponemos al final '()' para invocarlo directamente y nos devuelva un i18n configruado.
 * Si metemos cookies hay que ponerlo por debajo de cookieParser
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init); //Le decimos a Express que uitlice un middleeware que tiene i18n especial para Express, para que nos haga la vida más fácil.
console.log(i18n.__('Welcome to'), app.locals.title); // Se le pasa a esta función códigos de literal
// Probamos a cambiarlo a español
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to'), app.locals.title);

const loginController = require('./routes/LoginController');
const jwtAuth = require('./lib/JwtAuth'); //Cargo mi generador de middlewares de authenticación con JWT

/**
 * Rutas del API
 * Es recomendable que corresponda la ruta del browser con la ruta del filesystem
 * (Por si hubiera algún problema en la aplicación)
 */
// app.use('/api/anuncios', require('./routes/api/anuncios'));
// app.use('/api/tags', require('./routes/api/tags'));

//app.use('/api/v1/anuncios', require('./routes/api/v1/anuncios'));
app.use('/api/v1/anuncios', jwtAuth(), require('./routes/api/v1/anuncios'));

app.use('/api/v1/tags', require('./routes/api/v1/tags'));
app.use('/api/v1/loginJWT', loginController.postJWT)

/**
 * Inicializamos el sistema de sesiones
 * (Siempre debe estar por debajo del cookieParser para que ya estén parseadas las cookies)
 * Con el middleware (actuará en cada petición) que me deja la sesión del usuario cargada en req.session
 */
app.use(session({
  name: 'nodepop-session',
  //secret: 's1df-3lsa5d$j8flh-a0sjf=l9as',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { 
    //Activaremos secure cuando hagamos el servidor HTTPS: 
    //secure: true, //El browser solo la manda al servidor si usa HTTPS
    secure: false, //El browser solo la manda al servidor si NO usa HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 2, //Caducidad por inactividad (Ésta se resetea si entro antes de 2 días, que es cuando caduca la cookie)
  }
  // } ,
  // store: new MongoStore({
  //   // Le pasamos como conectarse a la BD
  //   mongooseConnection: mongooseConnection
  // })
}));

/**
 * Rutas del Website (de la aplicación)
 */

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
const sessionAuth = require('./lib/SessionAuth');


// Hacer disponible el objeto de sesión en las vistas:
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//app.use('/', require('./routes/index'));
app.get('/', sessionAuth(['admin']), require('./routes/index')); //sessionAuth(['admin']) --> Devuelve un middleware que valida que el usuario está logado y tiene rol necesario

// app.use('/api/v1/anuncios', jwtAuth(), require('./routes/api/v1/anuncios'));
// app.get('/', sessionAuth(['admin']), require('./routes/index')); //sessionAuth(['admin']) --> Devuelve un middleware que valida que el usuario está logado y tiene rol necesario


// const privateController = require('./routes/privateController');
// app.get('/', privateController.index); //Le pasamos el objeto index para que lo utilice como Midleware
// app.get('/', sessionAuth, privateController.index); //Le pasamos el objeto index para que lo utilice como Midleware

app.use('/tags', require('./routes/tags'));
app.use('/users', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));

// Aquí usamos el estilo de Controladores para estructurar las rutas:
app.get('/login', loginController.index); //Le pasamos el objeto index para que lo utilice como Midleware
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);


/**
 * middlewares para la Gestión de errores (404 y resto)
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Si fuera una página web por la que estamos dando error: Renderizamos la página web de error
 * Si fuera una petición al API por la que estamos dando error: Responderíamos con un JSON
 */
// error handler
app.use(function(err, req, res, next) {
  if(err.array) { // error de validación (Añadido para las validaciones de express-validator)
    err.status = 422; // ponemos el error Unprocessable Entity para que no devuleva el error 500 ya que la validación realizada en index (router.get('/enquerystring') no está devolviendo ningún error y la linea "res.status(err.status || 500);" si no hay error pone un 500
    
    /**
     * onlyFirstError: true -> Solo cogemos el primer error para cada campo añadido en la validación del index (talla, color, piso, dirección, ...), añadiéndolo al array. (podríamos cogerlos todos).
     * Ya que un campo puede tener varios errores de validación y sólo queremos pasar el primero que se genere 
     * Por ejemplo, El campo Letra sólo puede ser letra y en mayusculas:
     *  query('letra').isString().withMessage('debería ser numérico'),
     *  query('letra').isUppercase().withMessage('debería ser numérico'),
     * Si hubiera más validaciones de otros campos se iría añadiendo al array (err.array) el primer error encontrado (onlyFirstError).
     */
    const errInfo = err.array({ onlyFirstError: true })[0]; // err.array devuelve un array. Al poner [0] sólo cogemos el primer error que haya en ese array de errores.
    
    //err.message = `El parámetro ${errInfo.param} ${errInfo.msg}`;
    
    /**
     * Utilizamos un ternario para que devuelva:
     * - Si es una petición de API tendremos un objeto:
     *    {
     *      "error": "Not Found"
     *    }
     * - Si es una página web tendremos un string:
     *    `El parámetro ${errInfo.param} ${errInfo.msg}`
     * 
     * err.mapped(): Nos devuelve una lista con todos los errores que había de validación
     */
    err.message = isAPIRequest(req) ? 
    { message: 'Not valid', errors: err.mapped() }
    : `El parámetro ${errInfo.param} ${errInfo.msg}`;
  }

  // Subimos esta línea por encima de si el error fuera a un API (JSON) para que nos devuelva el tipo de error (404, 500, ...) en herrmientas tipo Postman.
  res.status(err.status || 500);

  // Llamamos a la funición para saber si es o no una API
  // Si es una API devolvemos el error con un formato JSON
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizamos la página web de error (Render the error page)
  // res.status(err.status || 500);
  res.render('error'); //renderizamos una página de error, mostrando el error: Llama a la vista ./views/error.ejs o html
});

/**
 * Función que nos dirá si es o no una API (Devolviendo true/false)
 */
function isAPIRequest(req) {
  // req.originalUrl: Devuelve todo menos el dominio (http://localhost:3000/api/zzz devuelve /api/zzz)
  return req.originalUrl.startsWith('/api/'); // Si lo que devuelve comienza por /api/
}

module.exports = app;