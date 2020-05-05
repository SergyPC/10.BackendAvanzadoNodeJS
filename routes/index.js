'use strict'

var express = require('express');
var router = express.Router();
//const getAds = require('./../public/javascripts/apiCalls');
const api = require('./../public/javascripts/apiCalls');
const { getAds, getTags } = api();

//Validaciones En el middleware: Destructuring:
//const { query, check, validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  try {
    const queryparams = req.url; //http://localhost:3000/?name=ip&sell=1 -> req.url: /?name=ip&sell=1
    const sell = req.query.sell;
    const price = req.query.price;
    let isIncorrect = false;

    //Verificar quién pide la página (Si se ha autenticado en el login, a través de loginController.js)
    // if(!req.session.authUser) { //Si esta propiedad de la sesión no existe no está logado/autenticado
    //   res.redirect('/login');
    //   return;
    // }

    if (typeof sell !== 'undefined') { 
      if (sell !== 'true' && sell !== 'false' && sell !== '1' && sell !== '0') { //Si han añadido un valor que no es boolean
          isIncorrect = true;
      }
    }

    if (typeof price !== 'undefined') { 
      const regExpNumbers = new RegExp(/^[0-9]+(.[0-9]+)?$/);
      const rango = price.split('-');
      if (rango.length === 1) { //price=50
        if (!(regExpNumbers.test(price)) || price.indexOf(',') !== -1) 
          isIncorrect = true;
      }
      else if (rango.length === 2) { //Si contiene algún guión
        if(price.startsWith('-', 0)) { //price=-50
          if (!(regExpNumbers.test(rango[1])) || rango[1].indexOf(',') !== -1) 
            isIncorrect = true;  
        }
        else {
          if (!rango[1]) { //price=10-
            if (!(regExpNumbers.test(rango[0])) || rango[0].indexOf(',') !== -1) 
              isIncorrect = true;
          }
          else { //price=10-50
            if (!(regExpNumbers.test(rango[0])) || rango[0].indexOf(',') !== -1 || !(regExpNumbers.test(rango[1])) || rango[1].indexOf(',') !== -1) 
              isIncorrect = true;
          }
        } 
      } 
      else { //Si contiene 3 o más valores
        isIncorrect = true;
      }
    }

    let ads;
    if (isIncorrect) { //Si han añadido algún valor erróneo
      ads = []; 
    }
    else {
      ads = await getAds(queryparams);
    }

    const tags = await getTags("?distinct=name");
    //const ads = await getAds(queryparams);
    
    res.render('index', {
      title: 'NodePOP',
      data: [ads, tags],
    });
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;