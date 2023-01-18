const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const planetsRouter = require("./routes/planets/planets.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(planetsRouter);

module.exports = app;
