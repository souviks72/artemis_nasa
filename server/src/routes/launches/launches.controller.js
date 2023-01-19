const {
  getAllLaunches,
  addNewLaunch,
} = require("../../models/launches.models");

//launches is a Js Map, launches.values() returns an iterable
//iterables are LIKE arrays, but not array
//iterables cannot be json serialized
//Array.from(launches.value()) converts it to an array
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  //in json data, always pass date as a string and then convert it in code
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
