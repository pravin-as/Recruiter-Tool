const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Connection = require("./database/db");
const candidateRoutes = require("./routes/candidates"); // Import the new routes

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

console.log(username);

Connection(username, password);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/candidates", candidateRoutes);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
