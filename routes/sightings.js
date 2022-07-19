const controller = require("../controllers/sightings");

module.exports = (app) => {
  app.get("/", controller.searchSighting);
};
