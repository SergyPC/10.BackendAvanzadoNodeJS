'use strict';

module.exports = function(rolesToValidate) {
    return function (req, res, next) {
        //Verificar quién pide la página (Si se ha autenticado en el login, a través de loginController.js)
        if(!req.session.authUser) { //Si esta propiedad de la sesión no existe no está logado/autenticado
            res.redirect('/login');
            return;
        }

        // Si llega aquí sabemos que está logado pero ahora tocaría ver si tiene permisos para poder acceder al siguiente middleware
        // (Si no tuviera suficientes permisos se le podría reenviar a una pagina de no tienes suficientes permisos para ver esta página)
        
        // rolesToValidate: Son los Roles que tiene que tener el usuario para dejarle pasar por aquí
        // Comprobar roles (Si el usuario tiene un determindado rol) (Si hubiera guardado sus roles en la sesión cuando hizo login, me sería muy fácil: Comprobar que tiene ese Rol en los roles que he guardado en su sesión)
            // Buscar el usuario en la BD (Si no he guardado los roles en su sesión)
            // Comprobar que tiene al menos los rolesToValidate
                // Si no tiene un rol necesario: Redirect a una pagina donde le digas que no tienes permisos para hacer esa acción

        next();
    }
}