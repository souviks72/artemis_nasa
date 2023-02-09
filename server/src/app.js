const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const api = require("./routes/api");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json()); //allows express to accept request body in json format
//data is available on req.body object

app.use("/v1", api);

module.exports = app;
//udbNLfawyszn0oUM
//mongo db password user: nasa_api
//mongodb+srv://nasa_api:udbNLfawyszn0oUM@cluster0.n8jnlt1.mongodb.net/nasa?retryWrites=true&w=majority
