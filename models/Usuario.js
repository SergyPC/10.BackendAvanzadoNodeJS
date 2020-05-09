// 'use strict';

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');

// // crear un esquema
// // https://mongoosejs.com/docs/schematypes.html
// const usuarioSchema = mongoose.Schema({
//   email: { type: String, unique: true }, //El email sería un índice único
//   password: String,
// });

// // Creamos un método estatico para hasear/encriptar una password (A través del constructor)
// usuarioSchema.statics.hashPassword = function(plainPassword) {
//   return bcrypt.hash(plainPassword, 10);
// }

// // Creamos un método de instacia de usuario: En un método de instancia NUNCA USAR UNA ARROW FUNCTION YA QUE PIERDES EL THIS
// // (con cada instancia de usuario mandaremos un email a ese usuario)
// usuarioSchema.methods.sendEmail = function(from, subject, body) {
//   // El destinatario no lo recibe por párametro porque ya la va a saber. Porque es un método de una instancia de usuario (ese usuario ya tiene su email definido)
//   // Crear transport

//   console.log('ENTRO EN usuarioSchema.methods.sendEmail');

//   const transport = nodemailer.createTransport({ // Le pasamos un objeto de configuración:
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_SERVICE_USER,
//       pass: process.env.EMAIL_SERVICE_PASS
//     }
//   });

//   // console.log(`CORREO A ENVIAR: 
//   //               Service: ${transport.service}, 
//   //               User: ${transport.auth.user}, 
//   //               Pass: ${transport.auth.pass}, 
//   //               From: ${from}, 
//   //               To: ${this.email}, 
//   //               Subject: ${subject}, 
//   //               Body: ${body}.`);

//   console.log('creo el transport');

//   // Enviar el correo (sendMail devuelve una promesa)
//   return transport.sendMail({
//     from: from,
//     to: this.email, //El to es el Email del usuario, de ese objeto de usuario que estoy utilizando. Ya que es un método de instacia (Después lo llamaremos con usario.sendEmail y ahí le mandará un email a esa instancia de usuario)
//     subject: subject,
//     html: body //Para texto plano sería text: body
//   });
// }

// // con el esquema, creamos un modelo
// const Usuario = mongoose.model('Usuario', usuarioSchema);

// // exportamos el modelo
// module.exports = Usuario;

'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const nodemailer = require('nodemailer');
//const nodemailerTransport = require('../lib/nodemailerServiceTransport');

const usuarioSchema = mongoose.Schema({
  //email: { type: String, index: true }, //Crearía un indice por email
  email: { type: String, unique: true }, //Crearía un indice por email. Pero además No permite añadir duplicados por email
  password: String,
});

usuarioSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10); //10: Nº de rondas de hasheo que queremos que utilice
};

// // en los métodos de instancia no usar arrow functions (pierdes el this de mongoose)
// usuarioSchema.methods.sendEmail = function(from, subject, body) {
//   // // crear transport
//   // const transport = nodemailer.createTransport({
//   //   service: process.env.EMAIL_SERVICE,
//   //   auth: {
//   //     user: process.env.EMAIL_SERVICE_USER,
//   //     pass: process.env.EMAIL_SERVICE_PASS
//   //   }
//   // });

//   // console.log("process.env.EMAIL_SERVICE:", process.env.EMAIL_SERVICE);
//   // console.log("process.env.EMAIL_SERVICE_USER:", process.env.EMAIL_SERVICE_USER);
//   // console.log("process.env.EMAIL_SERVICE_PASS:", process.env.EMAIL_SERVICE_PASS);
//   // console.log("this.email:", this.email);
//   // console.log("from:", from);
//   // console.log("subject:", subject);
//   // console.log("body:", body);

//   // enviar el correo
//   //return transport.sendMail({
//   return nodemailerTransport.sendMail({
//     from: from,
//     to: this.email,
//     subject: subject,
//     html: body
//   });

// }

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
