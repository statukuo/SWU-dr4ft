const {getCardByUuid, getSet} = require("./data");
const {sampleSize} = require("lodash");
const { random } = require("lodash");


const makeLeaderBooster = (setCodes) => {

  return setCodes.map(getSet).map(set => {
    const isRare = !random(6);

    return sampleSize(isRare ? set.boosterData.leaderRare : set.boosterData.leaderCommon, 1);
  }).map(getCardByUuid);
};

module.exports = makeLeaderBooster;
