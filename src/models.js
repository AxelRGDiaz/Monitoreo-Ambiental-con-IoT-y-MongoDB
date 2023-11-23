const mongoose = require('mongoose');

// Definir modelo para la colección "Proyecto"
const ProyectoModel = mongoose.model('Proyecto', new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  CO2: Number,
  movimiento: String,
  day: String,
  time: String
}, { collection: 'Proyecto', versionKey: false }));

module.exports = { ProyectoModel };
