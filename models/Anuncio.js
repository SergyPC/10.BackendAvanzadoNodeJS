'use strict';

/**
 * Modelo de Anuncio
 */

// Cargamos Mongoose
const mongoose = require('mongoose');

// 1) Crear un esquema
// https://mongoosejs.com/docs/schematypes.html
const anuncioSchema = mongoose.Schema({
	name: String,
	sell: Boolean, //true (sell) or false (buy)
	price: Number,
    photo: String,

    thumbnail: String,
    
    tags: [String],
    detail: String,
    createdAt: Date,
    updatedAt: Date,
    //message: mongoose.Schema.Types.Mixed, //Recogerá cualquier tipología en esta propiedad
});

/**
 * Nos creamos un Método Estático. Sería como un prototype sobre anuncioSchema (Sobre la clase o modelo).
 * Ahora este modelo de anuncio tiene un método lista para usarlo en la API anuncios:
 *  const docs = await Anuncio.lista(filtro, limit, skip, sort, fields);
 * El método lista se lo estamos metiendo a la Clase Anuncio
 * Anuncio.lista(...) no es una instancia de anuncio. Esto respresanta a la Clase Anuncio (al Modelo).
 */
anuncioSchema.statics.lista = function (filter, limit, skip, sort, fields) {
    //return Anuncio.find(filter); //Cuando no existía el limit
    const query = Anuncio.find(filter);
    query.limit(limit); //Lo recibe como numérico
    query.skip(skip); //Lo recibe como numérico
    query.sort(sort);
    query.select(fields);
    // El find, limit, skip, sort, select... no se van a ejecutar hasta que ponga un .then o un .exec
    return query.exec(); // exec: Devolverá una promesa. Que al final, cuando sea resuelta, resolverá a una lista de documentos (Promise<Document[]>)
};

// 2) Con el esquema, creamos un modelo (<nombreDelModelo>, <esquemaQueNosHemosCreado>)
/**
 * IMPORTANTE:
 * El nombre del modelo debe estar la primera en singular y en MAYUSCULAS (Anuncio)
 * Y tu colección de la BBDD se llama agentes (en plurar y en minusculas)
 * El nombre del modelo y el nombre de la colección debe coincidir (Agente/agentes) para que pueda localizarlo en la BBDD.
 * Mongoose, lo que hace, es el nombre que le ponemos en 'Anuncio' lo trata como si estuviera en minúsculas y pluralizada [Anuncio -> anuncios], 
 *           y ese es el nombre que va a buscar en la BBDD (db.anuncios)
 * Plural: https://mongoosejs.com/docs/models.html
 */
const Anuncio = mongoose.model('Anuncio', anuncioSchema); //mongoose pluraliza y lo pone en minusculas [Anuncio -> anuncios] (buscando en la BBDD agentes)

// 3) Exportamos el modelo
module.exports = Anuncio;