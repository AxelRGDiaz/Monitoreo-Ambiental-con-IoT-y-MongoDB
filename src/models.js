const mongoose = require('mongoose');

// Definir modelo para la colección "Proyecto"
const ProyectoModel = mongoose.model('Proyecto', new mongoose.Schema({
  temperature: String,
  humidity: String,
  CO2: Number,
  movimiento: Number,
  hora: Number,
  minuto: Number,
  segundo: Number,
  dia: Number,
  mes: Number,
  año: Number
}, { collection: 'Proyecto', versionKey: false }));

module.exports = { ProyectoModel };
