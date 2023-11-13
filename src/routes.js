const express = require('express');
const router = express.Router();

// Importar el cliente MQTT
const mqttClient = require('./mqttHandler');

// Importa los modelos de Mongoose desde models.js
const { ProyectoModel } = require('./models');
const nomA = 'Axel Ramon Guerrero Diaz';
// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.send(`<h1>Hola mi nombre es: ${nomA}</h1>`);
  console.log('Hola mi nombre es:', nomA);
});

// Ruta para la página de ActividadVI
router.get('/actividadVI', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

// Ruta para la página de dataDB
router.get('/dataDB', (req, res) => {
  res.sendFile(__dirname + '/../public/Views/dataDB.html');
  console.log('Hola');
});

// Ruta para obtener documentos de la colección "Proyecto"
router.get('/obtenerP', async (req, res) => {
  try {
    const documentos = await ProyectoModel.find();
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener documentos' });
  }
});

// Ruta para agregar un documento a la colección "Proyecto"
router.post('/agregarP', async (req, res) => {
  const { temperature, humedad, co2, movement, day, time } = req.body;
  try {
    const nuevoDocumento = new ProyectoModel({ temperature, humedad, co2, movement, day, time });
    await nuevoDocumento.save();
    const io = req.app.io;
    // Emitir evento de socket cuando se agrega un nuevo documento
    io.emit('nuevoDocumento', { message: 'Nuevo documento agregado', nuevoDocumento });

    res.json({ message: 'Documento agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar el documento:', error);
    const io = req.app.io;
    // Emitir un evento de error al cliente
    io.emit('errorAgregarDocumento', { error: 'Error al agregar el documento' });

    res.status(500).json({ error: 'Error al agregar el documento' });
  }
});
// Ruta para editar un documento por _id en la colección "Proyecto"
router.put('/editarP/:id', async (req, res) => {
  const { id } = req.params;
  const { temperature, humi, co2, movement, day, time } = req.body;
  try {
    await ProyectoModel.findByIdAndUpdate(id, { temperature, humi, co2, movement, day, time });

    // Acceder a io desde app
    const io = req.app.io;

    // Emitir evento de socket cuando se edita un documento
    io.emit('documentoEditado', { message: 'Documento editado con éxito', id, updatedData: { temperature, humi, co2, movement, day, time } });

    res.json({ message: 'Documento editado con éxito' });
  } catch (error) {
    console.error('Error al editar el documento:', error);

    // Acceder a io desde app
    const io = req.app.io;

    // Emitir un evento de error al cliente
    io.emit('errorEditarDocumento', { error: 'Error al editar el documento' });

    res.status(500).json({ error: 'Error al editar el documento' });
  }
});


// Ruta para eliminar un documento por _id en la colección "Proyecto"
router.delete('/eliminarP/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await ProyectoModel.findByIdAndDelete(id);
    // Acceder a io desde app
    const io = req.app.io;

    // Emitir evento de socket cuando se elimina un documento
    io.emit('documentoEliminado', { message: 'Documento eliminado con éxito', id });

    res.json({ message: 'Documento eliminado con éxito' });
  } catch (error) {
    const io = req.app.io;

    // Emitir un evento de error al cliente
    io.emit('errorEliminarDocumento', { error: 'Error al eliminar el documento' });

    res.status(500).json({ error: 'Error al eliminar el documento' });
  }
});

module.exports = router;
