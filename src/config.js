const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 3000;

// Variables de entorno
const elUsuario = process.env.ElUsuario;
const laContra = process.env.LaContra;

// Middleware para conectar a MongoDB Atlas
const mongodbUri = `mongodb+srv://${elUsuario}:${laContra}123@cluster0.r4r6on5.mongodb.net/ClaseEsli`;
mongoose.connect(mongodbUri);

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
connection.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

app.use(bodyParser.json());
app.use('/actividadVI', express.static(__dirname + '/../public'));
app.use('/dataDB', express.static(__dirname + '/../public/Views'));
app.use('/Js', express.static(__dirname + '/../public/Js'));
app.use('/IMG', express.static(__dirname + '/../public/IMG'));
app.use(cors());

module.exports = { app, port };