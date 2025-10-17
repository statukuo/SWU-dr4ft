const RARITY = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Legendary",
  5: "Special"
};

const generateBoosterInfo = (sets, cards) => {
  const setsCopy = {};

  console.log("");
  console.log("=========================");
  console.log("GENERATING BOOSTER DATA");
  console.log("=========================");
  console.log("");

  Object.entries(sets).forEach(([key, set]) => {
    switch (key) {
    case "SOR":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 87.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 61, group: "common"}, {max: 87, group: "uncommon"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };

      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;

    case "SHD":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 87.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 61, group: "common"}, {max: 87, group: "uncommon"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };
      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;
    case "TWI":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 87.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 61, group: "common"}, {max: 87, group: "uncommon"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };
      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;
    case "JTL":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 80, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 60, group: "common"}, {max: 82, group: "uncommon"}, {max: 87, group: "special"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };
      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;
    case "LOF":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 80, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 60, group: "common"}, {max: 82, group: "uncommon"}, {max: 87, group: "special"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };
      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;
    case "SEC":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card)
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3, ratio: [{n: 1, distribution: [{max: 1, group: "common"}]}]},
          {type: "uncommon", count: 3, maxPerAspect: 2, ratio: [{n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 1, distribution: [{max: 1, group: "uncommon"}]}, {n: 100, distribution: [{max: 35, group: "common"}, {max: 93, group: "uncommon"}, {max: 98.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "rare", count: 1, ratio: [{n: 100, distribution: [{max: 80, group: "rare"}, {max: 100, group: "legendary"}]}]},
          {type: "foil", count: 1, foil: true, ratio: [{n: 100, distribution: [{max: 60, group: "common"}, {max: 82, group: "uncommon"}, {max: 87, group: "special"}, {max: 97.5, group: "rare"}, {max: 100, group: "legendary"}]}]},
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        special: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader")
      };
      setsCopy[key].readyToPlay = setsCopy[key].cards.length === set.baseSetSize;
      break;
    default:
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card) || [],
        readyToPlay: false
      };
      break;
    }

    console.log(`${key} is ${setsCopy[key].readyToPlay? "ready to player" : "NOT ready to play"}`);
  });

  return setsCopy;
};

module.exports = generateBoosterInfo;
