// server.js
const express = require("express");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const initializeSocket = require("./config/socket");

const app = express();

// Database connection
dbConnection();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(
  "/items_uploads",
  express.static(path.join(__dirname, "public/items_uploads"))
);

// Routes
app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/canteen", require("./routes/canteenRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/food-item", require("./routes/foodItemRoutes"));
app.use("/user/order", require("./routes/orderRoutes"));

app.use(errorHandler);

// Initialize Socket.IO
const { server, io } = initializeSocket(app);
app.set("io", io); // Set the io instance on the app

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// const express = require("express");
// const dotenv = require("dotenv").config();
// const dbConnection = require("./config/dbConnection");
// const logger = require("morgan");
// const cors = require("cors");
// const errorHandler = require("./middleware/errorHandler");
// const path = require("path");

// dbConnection();

// const app = express();
// app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use(
//   "/items_uploads",
//   express.static(path.join(__dirname, "public/items_uploads"))
// );

// app.use("/user", require("./routes/userRoutes"));
// app.use("/admin", require("./routes/adminRoutes"));
// app.use("/canteen", require("./routes/canteenRoutes"));
// app.use("/category", require("./routes/categoryRoutes"));
// app.use("/food-item", require("./routes/foodItemRoutes"));
// app.use("/user/order", require("./routes/orderRoutes"));

// app.use(errorHandler);

// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
