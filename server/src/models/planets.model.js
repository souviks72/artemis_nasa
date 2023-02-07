const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

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
      .on("data", async (chunk) => {
        if (isHabitablePlanet(chunk)) {
          savePlanet(chunk);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}); //all docs will be returned if search obj is empty
}
/*
  We can also find data by certain criteria and use projections to return specific fields from the entire doc
  eg:
  planets.find({
    keplerName: "kepler 1A",  
  }, {
    keplerName: 1,
    someField: 0
  })

  - the first obj has criteria while the second obj has projections
  - if value is 1 the field will be returned, if 0, it will be excluded
  - We can also pass a space seperated string, field names starting with "-" will be excluded
  - eg: "keplerName -someFieldToBeExcluded"
  */

async function savePlanet(planetData) {
  try {
    await planets.updateOne(
      {
        keplerName: planetData.kepler_name,
      },
      {
        keplerName: planetData.kepler_name,
      },
      {
        upsert: true,
      } //first obj is filter, second for update data, if upsert: true
    );
  } catch (err) {
    console.error(`Could not save planet data: ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
