'use strict';

const i18n = require('i18n');
const path = require('path'); // Cargamos la librería para unir la ruta de los idiomas

module.exports = function() { // Exportamos una función que configurará i18n
    
    // console.log("ENTRO EN i18nConfigure.js");

    i18n.configure({
        locales: ['en', 'es'],
		directory: path.join(__dirname, '..', 'locales'), //Dónde están los diferentes idiomas
		defaultLocale: 'en', // Idioma por defecto
        autoReload: true, // Recargar ficheros de idioma si cambian
        syncFiles: true, // Crear literales en todos los locales (en.json, es.json, etc) automáticamente en desarrollo
        cookie: 'nodepop-locale' // Recoge esa Cookie colocada en la respuesta, en change-locale.js, para saber que locale usar (ES, EN, ...)
    });

    // Por si usamos i18n en scripts:
    i18n.setLocale('en');

    return i18n;
};
