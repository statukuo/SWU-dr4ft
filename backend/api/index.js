
const express = require("express");
const games = require("./games");
const sets = require("./sets");
const stats = require("./stats");
const apiRouter = express.Router();

apiRouter
  .use("/games", games)
  .use("/sets", sets)
  .use("/stats", stats);

module.exports = apiRouter;
