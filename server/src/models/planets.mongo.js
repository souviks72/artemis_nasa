const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

/*
- Compiling a schema into a model
- module name should always be singular and Capitalised
- Mongodb will create a collection with this model; and 
    lowercase & pluralise it to "planets"
*/
module.exports = mongoose.model("Planet", planetsSchema);
