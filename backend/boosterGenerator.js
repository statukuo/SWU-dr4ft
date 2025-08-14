const {getCardByUuid, getSet} = require("./data");
const {sampleSize, random, concat} = require("lodash");

const makeBoosterFromRules = (setCode, withLeader) => {
  const set = getSet(setCode);
  return getDefaultBooster(set, withLeader);
};

const getDefaultBooster = (set, withLeader) => {
  let { Common, Uncommon, Rare, Legendary, Special, Leader } = set;
  const isLegendary = Legendary && !random(6);

  const cardNames = concat(
    withLeader? sampleSize(Leader, 1) : [],
    sampleSize(Common, 9),
    sampleSize(Uncommon, 3),
    sampleSize(isLegendary? Legendary : Rare, 1),
    sampleSize([...Common,...Uncommon,...Rare,...Legendary,...Special], 1)
  );

  return cardNames.map(getCardByUuid);
};

module.exports = makeBoosterFromRules;
