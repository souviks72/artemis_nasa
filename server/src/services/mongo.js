const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa_api:6n9NDkm8hnBB43zx@cluster0.n8jnlt1.mongodb.net/nasa?retryWrites=true&w=majority";

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
