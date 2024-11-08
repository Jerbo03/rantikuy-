const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Conexión de socket para actualizar gráficos en tiempo real
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    
    // Simulación de actualización de gráficos
    setInterval(() => {
        const oferta = Math.floor(Math.random() * 100);
        const demanda = Math.floor(Math.random() * 100);
        socket.emit('actualizarGraficos', { oferta, demanda });
    }, 3000);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
