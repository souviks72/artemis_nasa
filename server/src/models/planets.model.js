const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const results = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  //streams are async, so we will need to return a promise as express is requiring this on startup

  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          //pipe connects a readable stream(fs.createReadStream) to a writeable stream(parse())
          comment: "#",
          columns: true,
        })
      )
      .on("data", (chunk) => {
        if (isHabitablePlanet(chunk)) {
          results.push(chunk);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        //console.log(results);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: results,
};
