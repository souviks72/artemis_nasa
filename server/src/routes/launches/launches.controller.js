const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

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

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  try {
    const launch = await existsLaunchWithId(launchId);
    if (!launch) {
      return res.status(404).json({
        error: "Launch not found",
      });
    }

    const isLaunchAborted = await abortLaunchById(launchId);
    if (!isLaunchAborted) {
      return res.status(400).json({
        error: "Launch not aborted",
      });
    }
    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
