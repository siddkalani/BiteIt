const express = require("express");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const initializeSocket = require("./config/socket");

const app = express();

dbConnection();

// Middleware
app.use(
  cors({
    origin: "*", 
    methods: "*", 
    allowedHeaders: "*", 
    credentials: true,
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
app.use("/faculty", require("./routes/facultyRoutes"));

app.use(errorHandler);

const { server, io } = initializeSocket(app);
app.set("io", io); 

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
