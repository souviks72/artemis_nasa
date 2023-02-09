const mongoose = require("mongoose");

require("dotenv").config(); //to allow test env to access config values as well(when connecting to mongo)

const MONGO_URL = process.env.MONGO_URL;

//all event listeners have this once() function which listens for the event only once
// listener.on() will listen for this event forever
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.set("strictQuery", false);

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
