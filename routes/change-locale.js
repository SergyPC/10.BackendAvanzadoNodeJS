const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
    // Recuperar el locale que nos pasan por párametro
    const locale = req.params.locale;

    // Guardar la página de la que viene para poder volver, para poder recargarla (cogiendo una cabecera de la petición del browser: Referer)
    const goTo = req.get('referer'); // Obtenemos el valor de esa cabecera

    // Establecemos la cookie del nuevo idioma
    res.cookie('nodepop-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 20}); //maxAge va en milisegundos: Esto serían 20 días

    // Redireccionamos a la página de la que venía
    res.redirect(goTo);
});

module.exports = router;