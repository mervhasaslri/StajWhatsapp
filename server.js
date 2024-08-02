const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New connection: ' + socket.id);

    socket.on('chat', (data) => {
        console.log(`Message from ${data.sender}: ${data.message}`);
        io.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

const PORT = 5500; // veya 5503
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
