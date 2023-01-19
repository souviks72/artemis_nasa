const { launches } = require("../../models/launches.models");

//launches is a Js Map, launches.values() returns an iterable
//iterables are LIKE arrays, but not array
//iterables cannot be json serialized
//Array.from(launches.value()) converts it to an array
function getAllLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
