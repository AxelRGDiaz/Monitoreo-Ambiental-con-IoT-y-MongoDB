const { app, port, server } = require('./src/config');
const routes = require('./src/routes');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const mqttClient = require('./src/mqttHandler');

// Configurar socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Puedes agregar más lógica aquí para manejar eventos de socket si es necesario
});

// Pasa el servidor HTTP a la aplicación para que socket.io pueda interceptar solicitudes HTTP
app.server = httpServer;
app.io = io;

// Usar las rutas definidas en routes.js
app.use('/', routes);

// En qué puerto está corriendo la app
httpServer.listen(port, () => {
  console.log(`Aplicación Node.js escuchando en el puerto ${port}`);
});
