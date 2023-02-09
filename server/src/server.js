const http = require("http");

require("dotenv").config(); //loads config values into process.env from .env file

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
//This pattern allows us to listen to other types of requests like sockets
//The traditonal express server listens only for http requests
const PORT = process.env.PORT || 8000;

const server = http.createServer(app); //express is just a listener

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
