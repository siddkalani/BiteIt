const http = require('http');
const socketIo = require('socket.io');

const initializeSocket = (app) => {
    // Create the HTTP server
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return { server, io }; // Return both the server and io instances
};

module.exports = initializeSocket;
