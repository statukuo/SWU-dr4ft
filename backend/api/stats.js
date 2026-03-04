const express = require("express");
const statsRouter = express.Router();
const fs = require("fs");
const { uniq } = require("lodash");
const path = require("path");

statsRouter
  .get("/", (req, res) => {
    let draftCount = 0;
    let sealedCount = 0;
    let uniquePlayers = [];
    let boosterPacks = {};

    const startTime = Date.now();

    const jsonsInDir = fs.readdirSync("./log/gameStats").filter(file => path.extname(file) === ".json");

    jsonsInDir.forEach(file => {
      const fileData = fs.readFileSync(path.join("./log/gameStats", file));
      try {
        const json = JSON.parse(fileData.toString());


        //Get booster pack distribution
        json.sets.forEach(set => {
          if (!boosterPacks[set]) {
            boosterPacks[set] = 0;
          }

          boosterPacks[set]++;
        });

        //Get unique player list
        uniquePlayers.push(...json.cap.filter(({name}) => name !== "bot").map(({id}) => id));

        //Get game count
        if (json.type === "draft") { draftCount++;}
        if (json.type === "sealed") { sealedCount++;}
      } catch (e){
        console.error("Error processing:", file);
        console.error(e);
      }
    });

    console.log("Generated stats in " + (Date.now() - startTime) + " ms");

    res.json({
      draftCount,
      sealedCount,
      boosterPacks,
      playerCount: uniq(uniquePlayers).length
    });
  });

module.exports = statsRouter;
