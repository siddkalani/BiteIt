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
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  // Map to track connected users (key: user ID or socket ID, value: socket details)
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    const clientAddress = socket.handshake.address; // Get client IP
    const clientId = socket.id;

    // Use socket.id as the unique identifier
    const userId = socket.handshake.query.userId || clientId;

    console.log(`A user connected: ${clientId} (${clientAddress}) with ID: ${userId}`);

    // If userId is already connected, clean up the stale connection
    if (connectedUsers.has(userId)) {
      const activeSocketId = connectedUsers.get(userId);

      // Check if the existing socket is still active
      const activeSocket = io.sockets.sockets.get(activeSocketId);
      if (activeSocket) {
        console.log(
          `Duplicate connection detected for user ${userId}. Disconnecting old socket ${activeSocketId}`
        );
        activeSocket.disconnect(); // Disconnect the old socket instead of the new one
      }

      // Remove the old connection
      connectedUsers.delete(userId);
    }

    // Register the new connection
    connectedUsers.set(userId, clientId);

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

      // Remove socket from the connected users map
      if (connectedUsers.get(userId) === clientId) {
        connectedUsers.delete(userId);
        console.log(`Removed user ${userId} from connected users map`);
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

  return { server, io };
};

module.exports = initializeSocket;
