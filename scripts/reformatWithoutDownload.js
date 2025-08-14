const fs = require("fs");
const cards = require("../data/cards.json");
const sets = require("../data/sets.json");
const { default: generateBoosterInfo } = require("./generateBoosterData");


function reformatSets () {
  fs.writeFile("data/sets.json", JSON.stringify(generateBoosterInfo(sets, cards)), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("DONE with sets");
  });
}

reformatSets();
