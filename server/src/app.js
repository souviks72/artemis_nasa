const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public", "build")));

app.use(planetsRouter);
app.use(launchesRouter);
//client side routing
//whenever express gets a route that it does not have, it passes that on to react/client
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "build", "index.html"));
});

module.exports = app;
