const {getCardByUuid, getSet, getLogDir} = require("./data");
const { sample, random, concat, some} = require("lodash");
const path = require("path");
const jsonfile = require("jsonfile");

const makeBoosterFromRules = (setCode, withLeader) => {
  const set = getSet(setCode);
  return getDefaultBooster(set, withLeader);
};

const getDefaultBooster = (set, withLeader) => {
  let { leader, slots } = set.boosterData;
  let minimunCount = withLeader? 1: 0;
  let realCount = withLeader? 1: 0;

  const cardNames = concat(
    withLeader? [sample(leader)].map(cardId => ({cardId})) : [],
    ...slots.map(({type, count, replacement, ratio, foil, ensureAspects, maxPerAspect, singleReplace}) => {
      const selectedCards = [];
      let needsToBeReplaced = replacement && ratio && !random(ratio);
      const aspectsCount = {
        Vigilance : 0,
        Command: 0 ,
        Aggression: 0,
        Cunning: 0,
        Heroism: 0,
        Villainy: 0,
        Neutral: 0
      };

      const mandatoryAspects = {
        Vigilance : 0,
        Command: 0 ,
        Aggression: 0,
        Cunning: 0
      };

      while (selectedCards.length < count) {
        minimunCount++;
        let validCard = false;
        let candidateCardUUID;

        while (!validCard) {
          realCount++;
          candidateCardUUID = sample( set.boosterData[needsToBeReplaced? replacement : type]);

          const candidateCard = getCardByUuid(candidateCardUUID);
          const importantAspect = candidateCard.aspects[0] || "Neutral";

          if (ensureAspects) {
            if ( aspectsCount[importantAspect] > 0 && some(mandatoryAspects, (count, aspect) => count === 0 && aspect !== importantAspect) ) {
              validCard = false;
              continue;
            }
          }

          if (maxPerAspect) {
            if (aspectsCount[importantAspect] === maxPerAspect) {
              validCard = false;
              continue;
            }
          }

          if (selectedCards.includes(candidateCardUUID)) {
            validCard = false;
            continue;
          }

          validCard = true;

          if (singleReplace) {
            needsToBeReplaced = false;
          }

          aspectsCount[importantAspect]++;
          mandatoryAspects[importantAspect] >= 0 && mandatoryAspects[importantAspect]++;
        }

        selectedCards.push(candidateCardUUID);
      }

      if (ensureAspects && some(mandatoryAspects, (count) => count === 0)) {
        console.error("WRONG BOOSTER: ", mandatoryAspects, aspectsCount);
      }

      return selectedCards.map(cardId => ({cardId, foil}));
    })
  );

  const file = path.join(getLogDir(), "boosterMetrics.json");
  jsonfile.writeFile(file, {
    date: Date.now(),
    cardsGenerated: minimunCount,
    cardAttemps: realCount,
    accuracy: (minimunCount / realCount * 100).toFixed(2)
  }, { flag: "a" }, function (err) {
    if (err) console.log(err);
  });

  console.log("BOOSTER PACK GENERATED WITH ", minimunCount, "CARDS (took ", realCount, "calls to get it ", (minimunCount / realCount * 100).toFixed(2) , "% accuracy)");

  return cardNames.map(({cardId, foil}) => ({...getCardByUuid(cardId), foil}));
};

module.exports = makeBoosterFromRules;
