'use strict';

class PrivateController {
    index(req, res, next) {

        console.log('ENTRO EN PrivateController');

        //Verificar quién pide la página (Si se ha autenticado en el login, a través de loginController.js)
        if(!req.session.authUser) { //Si esta propiedad de la sesión no existe no está logado/autenticado
            res.redirect('/login');
            return;
        }

        //res.render('privado');
        
        //res.render('index');

        res.render('/');
    }
}

module.exports = new PrivateController();