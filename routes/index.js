'use strict'

var express = require('express');
var router = express.Router();
const api = require('./../public/javascripts/apiCalls');
const { getAds, getTags } = api();

// Cargamos y utilizamos el modelo de Anuncio para utilizar los diferentes métodos del API (GET, POST, PUT, DELETE...)
const Anuncio = require('../models/Anuncio');
const Tag = require('../models/Tag');

//Validaciones En el middleware: Destructuring:
//const { query, check, validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  try {
    const name = req.query.name;
    const sell = req.query.sell;
    const price = req.query.price;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit || 100); // Si no hay req.query.limit (No lo han añadido) devuelve como máximo 100 documentos //Lo convertimos a integer ya que la queryString devuelve cualquier numero como string...
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    let fields = req.query.fields;
    let filter = {};
    let isIncorrect = false;

    //console.log('ENTRO EN GET de routes/index.js');
    
    // Eliminamos el campo __v que añade MongoDB por defecto
    //(typeof fields === 'undefined') ? fields = '-__v' : fields += ' -__v';

    //Sólo permito eliminar el campo '-__v'
    (typeof fields === 'undefined') ? fields = '-__v' : fields = '-__v'; 

    if (typeof name !== 'undefined') { 
        filter.name = { $regex: '^' + name, $options: 'i' }; //Filtrará por algo que comience por el nombre introducido, sin diferenciar entre mayúsculas y minúsculas
    }

    if (typeof sell !== 'undefined') { 
        if (sell !== 'true' && sell !== 'false' && sell !== '1' && sell !== '0') { //Si han añadido un valor que no es boolean
            isIncorrect = true;
        }
        filter.sell = sell;
    }

    /**
     * Permite múltiples precios:
     * ● 10-50 buscará anuncios con precio incluido entre estos valores { price: { '$gte': '10', '$lte': '50' } }
     * ● 10- buscará los que tengan precio mayor que 10 { price: { '$gte': '10' } }
     * ● -50 buscará los que tengan precio menor de 50 { price: { '$lte': '50' } }
     * ● 50 buscará los que tengan precio igual a 50 { price: '50' }
     */
    if (typeof price !== 'undefined') { 
        const regExpNumbers = new RegExp(/^[0-9]+(.[0-9]+)?$/);
        const rango = price.split('-');
        if (rango.length === 1) { //price=50
            (regExpNumbers.test(price) && price.indexOf(',') === -1) ? filter.price = parseFloat(price) : isIncorrect = true;
        }
        else if (rango.length === 2) { //Si contiene algún guión
            if(price.startsWith('-', 0)) { //price=-50
                (regExpNumbers.test(rango[1]) && rango[1].indexOf(',') === -1) ? filter.price = { $lte: parseFloat(rango[1]) } : isIncorrect = true;
            } 
            else {
                if (!rango[1]) { //price=10-
                    (regExpNumbers.test(rango[0]) && rango[0].indexOf(',') === -1) ? filter.price = { $gte: parseFloat(rango[0]) } : isIncorrect = true;
                }
                else { //price=10-50
                    ((regExpNumbers.test(rango[0]) && rango[0].indexOf(',') === -1) && (regExpNumbers.test(rango[1]) && rango[1].indexOf(',') === -1)) ? filter.price = { $gte: parseFloat(rango[0]), $lte: parseFloat(rango[1]) } : isIncorrect = true;
                }
            }
        } 
        else { //Si contiene 3 o más valores
          isIncorrect = true;
        }
    }

    /**
     * Permite múltiples tag:
     * ● Separados por coma: tags=work,lifestyle
     * ● Separados por espacio: tags=work lifestyle
     */
    if (typeof tags !== 'undefined') { //if (tags) {
        let arrayTags;
        if (tags.indexOf(' ') != -1)
            arrayTags = tags.split(' ');
        else if (tags.indexOf(',') != -1)
            arrayTags = tags.split(',');
        else
            arrayTags = tags;
        filter.tags = { "$in": arrayTags };
    }

    let ads;
    //let docs;
    if (isIncorrect) { //Si han añadido un precio que no es numérico
      ads = [];
    }
    else { // Creamos un método estático, lista, en el modelo Anuncio.js
      ads = await Anuncio.lista(filter, limit, skip, sort, fields);
    }

    // const ads = await Anuncio.lista(filter, limit, skip, sort, fields); //http://localhost:3000/api/v1/anuncios?name=iPhone
    // res.json(ads);
    // const queryparams = req.url; //http://localhost:3000/?name=ip&sell=1 -> req.url: /?name=ip&sell=1
    // const ads = await getAds(queryparams);
    // const ads = await Anuncio.lista(filter, limit, skip, sort, fields);
    // const tagss = await getTags("?distinct=name");

    filter = {};
    const tagss = await Tag.lista(filter, '', '', 'name', '', 'name');

    res.render('index', {
      title: 'NodePOP',
      data: [ads, tagss],
    });
    
  } catch (err) {
      next(err);
  }

});

module.exports = router;