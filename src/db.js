const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGODB_URI;

mongoose.connect(url);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Conectado a MongoDB en Atlas')
})

db.on('error', () => {
  console.log('Error de conexión')
});
