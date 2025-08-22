const {getCardByUuid, getSet} = require("./data");
const {sampleSize, random, concat} = require("lodash");

const makeBoosterFromRules = (setCode, withLeader) => {
  const set = getSet(setCode);
  return getDefaultBooster(set, withLeader);
};

const getDefaultBooster = (set, withLeader) => {
  let { leader, slots } = set.boosterData;


  const cardNames = concat(
    withLeader? sampleSize(leader, 1).map(cardId => ({cardId})) : [],
    ...slots.map(({type, count, replacement, ratio, foil}) => {
      const needsToBeReplaced = replacement && ratio && !random(ratio);

      return sampleSize( set.boosterData[needsToBeReplaced? replacement : type], count).map(cardId => ({cardId, foil}));
    })
  );

  return cardNames.map(({cardId, foil}) => ({...getCardByUuid(cardId), foil}));
};

module.exports = makeBoosterFromRules;
