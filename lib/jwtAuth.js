'use strict';

//Middleware de comprobación de JWT

const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        // Recoger el token de la petición (Ya sea de la cabecera, de la queryString o del body)
        const token = req.get('Authorization') || req.query.token || req.body.token; //Saca el token de una de las 3 partes (de la que venga)
        
        // Si no nos dan token no pueden pasar
        if(!token) {
            const error = new Error('no token provider');
            error.status = 401;
            next(error);
            return;
        }

        // Si nos han dado un token: Verificar que el token es válido
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err) { //Si el token es invalido o caducado
                const error = new Error('invalid or expired token');
                error.status = 401;
                next(error);
                return;
            }
            req.apiAuthUserId = payload._id;
            req.apiAuthUserEmail = payload.email;
            next();
        });
    };
}