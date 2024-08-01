const express = require("express");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

dbConnection();

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/userRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/food-item", require("./routes/foodItemRoutes"));
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
