/**
 * Creamos un loginController para estructurar estas funciones de middleware de forma que me sea fácil después llamarlas de forma separada a Express
 * (Vamos a desacoplar un poco de Express para que sea más sencillo testearlas)
 * El módulo exportará un objeto con los métodos que hay en la clase
 */

'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class LoginController {

    /**
    * GET /login
    */
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    /**
     * POST /login
     */
    async post(req, res, next) {
        try {
            // recoger los parámetros de entrada
            const email = req.body.email;
            const password = req.body.password;

            console.log('ENTRO EN POST /login de LoginController.js');

            // const password = req.body.;
            // console.log('app.locals.tokenJWT:', app.locals.tokenJWT);

            // buscar el usuario en la base de datos
            const usuario = await Usuario.findOne({ email: email });

            // si no existe el usuario o la password no coincide
            if (!usuario || !await bcrypt.compare(password, usuario.password)) { //bcrypt.compare(passwordEnPlano, hashDeLaBD)
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;
            }

            // encuentro el usuario y la password es correcta
            
            // apuntar el ID de usuario en la sesión del usuario
            req.session.authUser = {
                _id: usuario._id
            };

            res.redirect('/');
            
            //res.redirect('/index');

            //res.redirect('/privado');

        //   // le mando un email, porque yo lo valgo
        //   await usuario.sendEmail(process.env.ADMIN_EMAIL, 'Login sospechoso', `
        //     Hemos detectado una actividad in....
        //   `);

        } catch (err) {
        next(err);
        }
    }

    /**
     * GET /logout
     */
    logout(req, res, next) {
        req.session.regenerate(err => { //El Método regenerate (al que le paso un callback de error de sesión) borra el contenido de la sesión de ese usuario (Destruye la sesión y crea una nueva vacía)
            if (err) {
                next(err);
                return;
            }
            //res.redirect('/'); //Le podemos mandar a la home si ésta no tuviera autenticación o a una de gracias por utilizar el servicio, ...
            res.redirect('/login'); //Le podemos mandar al login para volverse a logar
        });
    }

    /**
     * POST /api/loginJWT
     */
    async postJWT(req, res, next) {
        try {
            // recoger los parámetros de entrada
            const email = req.body.email;
            const password = req.body.password;

            // buscar el usuario en la base de datos
            const usuario = await Usuario.findOne({ email: email });

            // si no existe el usuario o la password no coincide
            if (!usuario || !await bcrypt.compare(password, usuario.password)) {
                //const error = new Error ('invalid credentials');
                const error = new Error (res.__('Invalid credentials'));
                error.status = 401;
                next(error);
                return;
            }

            // encuentro el usuario y la password es correcta

            // Crear un JWT
            const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
                expiresIn: '7d' //Tiempo de expiración del token
            });

            // Responder entregando ese JWT
            res.json({ token: token });

        } catch (err) {
            next(err);
        }
    }
    
}

module.exports = new LoginController();
