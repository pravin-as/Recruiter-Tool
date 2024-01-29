const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const morgan = require("morgan");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv");

const pool = require("./database/db");
const candidateRoutes = require("./routes/candidates");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware
app.use(cors());

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
  done();
});

app.use("/candidates", candidateRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("HOME PAGE !!!");
});

