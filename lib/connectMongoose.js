'use strict';

/**
 * Nos conectaremos a MongoDB usando mongoose
 * Y que nos devuelva la conexión para que así podamos utilizarla en el resto de nuestra aplicación
 */

// Cargamos librería de Mongoose
const mongoose = require('mongoose');

// Simboliza la conexión 
const conn = mongoose.connection;

// (Ahora podremos suscribirnos con ".on" (mongoose.connection.on(...)), que hereda de un even emiter. 
// Podemos suscribirnos a eventos que ocurran en esa conexión [como que haya un error, o que se abra la conexión...]) 


const i18n = require('./i18nConfigure')();

// Nos suscribimos al evento open 
conn.on('open', ()=> {
    console.log(i18n.__('Connected to MongoDB in'), conn.name); //(conn.name nos devuelve el nombre de la BBDD)
});

// Nos suscribimos al evento error
conn.on('error', (err)=> {
    console.error(i18n.__('Connection error'), err);
    // Como nuestro API, sus operaciones van a ir sobre la BBDD, si al arrancar la aplicación no conseguimos conectarnos a la BBDD, no nos interesa que nadie utilice el API porque no va a funcionar.
    process.exit(1); // Para ello paramos la aplicación.
});

// Para conectarnos al driver le tenemos que pasar:
    // Cadena de conexión a la BBDD que queremos conecarnos
    // Para mejorar el driver: { useNewUrlParser: true, useUnifiedTopology: true }
//mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Exportamos el objeto de mongoose.connection
module.exports = conn;