const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.models");

//launches is a Js Map, launches.values() returns an iterable
//iterables are LIKE arrays, but not array
//iterables cannot be json serialized
//Array.from(launches.value()) converts it to an array
async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  //in json data, always pass date as a string and then convert it in code

  if (
    !launch.mission ||
    launch.mission.length == 0 ||
    !launch.target ||
    launch.target.length == 0 ||
    !launch.rocket ||
    launch.rocket.length == 0 ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Missing required launch properties",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    //new Date().valueOf() will return a number, if invalid it will be a Nan
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  try {
    await scheduleNewLaunch(launch);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  //if launch id does not exist
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  //if launch exists
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
