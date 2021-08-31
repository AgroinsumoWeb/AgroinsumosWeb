require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Configuración
const app = express();
const database = require("./config/database");

// Process
const PORT = process.env.PORT;

// Middelwares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use("/auth", require("./routers/authConnection"));
app.use("/passage", require("./routers/dataPassage"));

// Server listen
app.listen(PORT, function () {
  console.log(`Server on port ${PORT}`);
});
