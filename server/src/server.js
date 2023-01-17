const http = require("http");

const app = require("./app");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app); //express is just a listener

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
//This pattern allows us to listen to other types of requests like sockets
//The traditonal express server listens only for http requests
