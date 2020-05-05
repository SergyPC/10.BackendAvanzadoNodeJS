'use strict';

/**
 * Modelo de Tag
 */

// Cargamos Mongoose
const mongoose = require('mongoose');

// 1) Crear un esquema
// https://mongoosejs.com/docs/schematypes.html
const tagSchema = mongoose.Schema({
	name: String, //nombre: String,
    //message: mongoose.Schema.Types.Mixed, //Recogerá cualquier tipología en esta propiedad
});

/**
 * Nos creamos un Método Estático. Sería como un prototype sobre tagSchema (Sobre la clase o modelo).
 * Ahora este modelo de tag tiene un método lista para usarlo en la API tags:
 *  const docs = await Tag.lista(filtro, limit, skip, sort, fields);
 * El método lista se lo estamos metiendo a la Clase Tag
 * Tag.lista(...) no es una instancia de tag. Esto respresanta a la Clase Tag (al Modelo).
 */
tagSchema.statics.lista = function (filter, limit, skip, sort, fields, distinct) {
    //return Tag.find(filter); //Cuando no existía el limit
    const query = Tag.find(filter);
    query.limit(limit); //Lo recibe como numérico
    query.skip(skip); //Lo recibe como numérico
    query.sort(sort);
    query.select(fields);
    query.distinct(distinct);
    // El find, limit, skip, sort, select... no se van a ejecutar hasta que ponga un .then o un .exec
    return query.exec(); // exec: Devolverá una promesa. Que al final, cuando sea resuelta, resolverá a una lista de documentos (Promise<Document[]>)
};

// 2) Con el esquema, creamos un modelo (<nombreDelModelo>, <esquemaQueNosHemosCreado>)
/**
 * IMPORTANTE:
 * El nombre del modelo debe estar la primera en singular y en MAYUSCULAS (Tag)
 * Y tu colección de la BBDD se llama agentes (en plurar y en minusculas)
 * El nombre del modelo y el nombre de la colección debe coincidir (Agente/agentes) para que pueda localizarlo en la BBDD.
 * Mongoose, lo que hace, es el nombre que le ponemos en 'Tag' lo trata como si estuviera en minúsculas y pluralizada [Tag -> tags], 
 *           y ese es el nombre que va a buscar en la BBDD (db.tags)
 * Plural: https://mongoosejs.com/docs/models.html
 */
const Tag = mongoose.model('Tag', tagSchema); //mongoose pluraliza y lo pone en minusculas [Tag -> tags] (buscando en la BBDD agentes)

// 3) Exportamos el modelo
module.exports = Tag;