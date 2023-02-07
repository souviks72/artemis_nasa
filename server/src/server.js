const http = require("http");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const app = require("./app");
//This pattern allows us to listen to other types of requests like sockets
//The traditonal express server listens only for http requests
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://nasa_api:6n9NDkm8hnBB43zx@cluster0.n8jnlt1.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app); //express is just a listener

//all event listeners have this once() function which listens for the event only once
// listener.on() will listen for this event forever
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.set("strictQuery", false);

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
