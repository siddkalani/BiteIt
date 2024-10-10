const http = require("http");
const socketIo = require("socket.io");

const initializeSocket = (app) => {
  // Create the HTTP server
  const server = http.createServer(app);

  // Initialize Socket.IO with CORS options
  const io = socketIo(server, {
    cors: {
      origin: "*", // Allow all domains
      methods: "*", // Allowed methods
      allowedHeaders: "*", // Allowed headers
      credentials: true, // Allow credentials if needed
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return { server, io }; // Return both the server and io instances
};

module.exports = initializeSocket;
