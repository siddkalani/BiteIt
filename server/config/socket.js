// const http = require("http");
// const socketIo = require("socket.io");

// const initializeSocket = (app) => {
//   // Create the HTTP server
//   const server = http.createServer(app);

//   // Initialize Socket.IO with CORS options
//   const io = socketIo(server, {
//     cors: {
//       origin: "*", // Allow all domains
//       methods: "*", // Allowed methods
//       allowedHeaders: "*", // Allowed headers
//       credentials: true, // Allow credentials if needed
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("joinRoom", (roomId) => {
//       socket.join(roomId);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });
//   });

//   return { server, io }; // Return both the server and io instances
// };

// module.exports = initializeSocket;

const http = require("http");
const socketIo = require("socket.io");

const initializeSocket = (app) => {
  // Create the HTTP server
  const server = http.createServer(app);

  // Initialize Socket.IO with CORS options
  const io = socketIo(server, {
    cors: {
      origin: "*", // Allow all domains
      methods: ["GET", "POST"], // Allowed methods
      allowedHeaders: ["Authorization"], // Example of allowed headers
      credentials: true, // Allow credentials if needed
    },
  });

  // Map to track connected clients (key: IP, value: active socket ID)
  const connectedClients = new Map();

  io.on("connection", (socket) => {
    const clientAddress = socket.handshake.address; // Get client IP
    const clientId = socket.id;

    console.log(`A user connected: ${clientId} (${clientAddress})`);

    // Check for duplicate connections
    if (connectedClients.has(clientAddress)) {
      const activeSocketId = connectedClients.get(clientAddress);

      // Check if the existing socket is still active
      const activeSocket = io.sockets.sockets.get(activeSocketId);
      if (activeSocket) {
        console.log(
          `Duplicate connection detected from ${clientAddress}. Disconnecting new socket ${clientId}`
        );
        socket.disconnect();
        return;
      }

      // Clean up stale connections
      console.log(`Cleaning up stale connection for ${clientAddress}`);
      connectedClients.delete(clientAddress);
    }

    // Register new connection
    connectedClients.set(clientAddress, clientId);

    // Handle user joining a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${clientId} joined room: ${roomId}`);
    });

    // Handle user disconnection
    socket.on("disconnect", (reason) => {
      console.log(
        `User disconnected: ${clientId} (${clientAddress}). Reason: ${reason}`
      );

      // Remove socket from the connected clients map
      if (connectedClients.get(clientAddress) === clientId) {
        connectedClients.delete(clientAddress);
        console.log(`Removed ${clientAddress} from connected clients map`);
      }
    });

    // Error handling for specific socket
    socket.on("error", (error) => {
      console.error(`Error on socket ${clientId}: ${error.message}`);
    });
  });

  // General error handling for Socket.IO
  io.on("error", (error) => {
    console.error(`Socket.IO error: ${error.message}`);
  });

  return { server, io }; // Return both the server and io instances
};

module.exports = initializeSocket;
