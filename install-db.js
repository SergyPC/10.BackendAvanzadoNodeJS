'use strict';

/**
 * Script para inicializar la colección de Anuncios y Tags.
 * Nos servirá para desplegar por primera vez nuestro proyecto en una maquina.
 * Una vez descargado el proyecto en nuestro ordenador (O al desplegarlo en PRE/PRO), ejecutaremos este script para que nos cree los datos iniciales de partida de la BBDD.
 * Lo utilizaremos una vez normalmente a no ser que queramos resetear la BBDD.
 */

require('dotenv').config()

// Usamos el conector de Mongoose
const conn = require('./lib/connectMongoose');

// Cargamos el modelo de Anuncio
const Anuncio = require('./models/Anuncio');
// Cargamos el modelo de Tag
const Tag = require('./models/Tag');
// Cargamos el modelo de Usuario
const Usuario = require('./models/Usuario');

// Una vez establecida la conexión a la BBDD, ejecutamos esta función asincrona para inicializar las colecciones que nos interesen:
conn.once('open', async () => {
    try {
        await initAnuncios();
        await initTags();
        await initUsuarios();
        conn.close();
    } catch (err) {
        console.error('Hubo un error en la inicialización de las colecciones:', err);
        process.exit(1);
    }
});

// Función para inicializar Anuncios (Devolverá una promesa)
async function initAnuncios() {
    const date = new Date();
    const detailLoren = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    await Anuncio.deleteMany(); //Borra todos los registros de la tabla anuncios
    await Anuncio.insertMany([  //Añadimos los registros que queramos inicializar por defecto
        { name: 'Bicicleta eléctrica Rodars 1000W', sell: true, price: 230.15, photo: 'bicicleta-rodars-1000W.jpg', thumbnail: 'bicicleta-rodars-1000W-tn.jpg', tags: ['lifestyle', 'motor'], detail: detailLoren, createdAt: date, updatedAt: date},
        { name: 'iPhone 11Pro', sell: true, price: 50.00, photo: 'iPhone-11-pro.jpg', thumbnail: 'iPhone-11-pro-tn.jpg', tags: ['lifestyle', 'mobile'], detail: detailLoren, createdAt: date, updatedAt: date },
        { name: 'Aston Martin DBS', sell: true, price: 225630.55, photo: 'aston-martin-dbs.jpg', thumbnail: 'aston-martin-dbs-tn.jpg', tags: ['lifestyle', 'motor'], detail: detailLoren, createdAt: date, updatedAt: date },
        { name: 'MacBook Air', sell: true, price: 250.50, photo: 'apple-macbook-air.jpg', thumbnail: 'apple-macbook-air-tn.jpg', tags: ['lifestyle', 'work'], detail: detailLoren, createdAt: date, updatedAt: date },
        { name: 'TV Samsung 4K UHD', sell: false, price: 4250.00, photo: 'TV-Samsung-49NU7305.jpg', thumbnail: 'TV-Samsung-49NU7305-tn.jpg', tags: ['lifestyle', 'work'], detail: detailLoren, createdAt: date, updatedAt: date },
    ]);
}

// Función para inicializar Tags  (Devolverá una promesa)
async function initTags() {
    await Tag.deleteMany(); //Borra todos los registros de la tabla tags
    await Tag.insertMany([  //Añadimos los registros que queramos inicializar por defecto
        { name: 'lifestyle' },
        { name: 'mobile' },
        { name: 'motor' },
        { name: 'work' },
    ]);
}

// Función para inicializar Usuarios  (Devolverá una promesa)
async function initUsuarios() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
      { 
        email: 'user@example.es',
        password: await Usuario.hashPassword('1234'),
      },
    ]);
}