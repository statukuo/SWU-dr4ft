const {getCardByUuid, getSet} = require("./data");
const {sampleSize, random, concat} = require("lodash");

const makeBoosterFromRules = (setCode, withLeader) => {
  const set = getSet(setCode);
  return getDefaultBooster(set, withLeader);
};

const getDefaultBooster = (set, withLeader) => {
  let { common, uncommon, rare, legendary, leader, foil, legendaryRatio } = set.boosterData;
  const isLegendary = legendary && !random(legendaryRatio);

  const cardNames = concat(
    withLeader? sampleSize(leader, 1) : [],
    sampleSize(common, 9),
    sampleSize(uncommon, 3),
    sampleSize(isLegendary? legendary : rare, 1),
    sampleSize(foil, 1)
  );

  return cardNames.map(getCardByUuid);
};

module.exports = makeBoosterFromRules;
