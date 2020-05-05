'use strict'

var express = require('express');
var router = express.Router();

// Cargamos y utilizamos el modelo de Tag para utilizar los diferentes métodos del API (GET, POST, PUT, DELETE...)
const Tag = require('../models/Tag');

router.get('/', async (req, res, next) => {
  try {
      const name = req.query.name;
      const limit = parseInt(req.query.limit || 100); // Si no hay req.query.limit (No lo han añadido) devuelve como máximo 100 documentos //Lo convertimos a integer ya que la queryString devuelve cualquier numero como string...
      const skip = parseInt(req.query.skip);
      const sort = req.query.sort;
      let fields = req.query.fields;
      const distinct = req.query.distinct || "name";
      let filter = {};
      
      // Eliminamos el campo __v que añade MongoDB por defecto
      //(typeof fields === 'undefined') ? fields = '-__v' : fields += ' -__v';

      //Sólo permito eliminar el campo '-__v'
      (typeof fields === 'undefined') ? fields = '-__v' : fields = '-__v'; 
  
      if (typeof name !== 'undefined') {
          filter.name = { $regex: '^' + name, $options: 'i' }; //Filtrará por algo que comience por el nombre introducido, sin diferenciar entre mayúsculas y minúsculas
      }

      const docs = await Tag.lista(filter, limit, skip, sort, fields, distinct); //http://localhost:3000/api/v1/tags?name=work
      
      //res.json(docs);
      res.render('tags', {
        title: 'NodePOP',
        data: docs,
      });
          
  } catch (err) {
      next(err);
  }
});

module.exports = router;