const RARITY = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Legendary",
  5: "Special"
};

const generateBoosterInfo = (sets, cards) => {
  const setsCopy = {};

  Object.entries(sets).forEach(([key, set]) => {
    switch (key) {
    case "SOR":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card),
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3},
          {type: "uncommon", count: 3, maxPerAspect: 2, replacement: "rare", ratio: 10, singleReplace: true},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary" ||
            (RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
        ),
      };
      break;

    case "SHD":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card),
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3},
          {type: "uncommon", count: 3, maxPerAspect: 2, replacement: "rare", ratio: 10, singleReplace: true},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary" ||
            (RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
        ),
      };
      break;
    case "TWI":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card),
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3},
          {type: "uncommon", count: 3, maxPerAspect: 2, replacement: "rare", ratio: 10, singleReplace: true},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary" ||
            (RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
        ),
      };
      break;
    case "JTL":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card),
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3},
          {type: "uncommon", count: 3, maxPerAspect: 2, replacement: "rare", ratio: 10, singleReplace: true},
          {type: "rare", count: 1, replacement: "legendary", ratio: 5},
          {type: "foil", count: 1, foil: true}
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary" ||
            (RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
        ),
      };
      break;
    case "LOF":
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card),
      };

      setsCopy[key].boosterData = {
        slots: [
          {type: "common", count: 9, ensureAspects: true, maxPerAspect: 3},
          {type: "uncommon", count: 3, maxPerAspect: 2, replacement: "rare", ratio: 10, singleReplace: true},
          {type: "rare", count: 1, replacement: "legendary", ratio: 5},
          {type: "foil", count: 1, foil: true}
        ],
        leaderCommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Leader"),
        leaderRare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].rarity] === "Legendary" ||
            (RARITY[cards[c].rarity] === "Special" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].rarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
        ),
      };
      break;
    default:
      setsCopy[key] = {
        code: set.code,
        releaseDate: set.releaseDate,
        baseSetSize: set.baseSetSize,
        name: set.name,
        cards: set.cards || Object.entries(set.cardsByNumber).map(([_, card]) => card) || [],
      };
      break;
    }
  });

  return setsCopy;
};

module.exports = generateBoosterInfo;
