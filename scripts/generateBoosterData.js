const RARITY = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Legendary",
  5: "Special"
};

export default function generateBoosterInfo(sets, cards) {
  const setsCopy = {};

  Object.entries(sets).forEach(([key, set]) => {
    console.log(key);
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
          {type: "common", count: 9},
          {type: "uncommon", count: 3},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leader: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] !== "Special" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary" ||
            (RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
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
          {type: "common", count: 9},
          {type: "uncommon", count: 3},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leader: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] !== "Special" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary" ||
            (RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
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
          {type: "common", count: 9},
          {type: "uncommon", count: 3},
          {type: "rare", count: 1, replacement: "legendary", ratio: 8},
          {type: "foil", count: 1, foil: true}
        ],
        leader: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] !== "Special" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary" ||
            (RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
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
          {type: "common", count: 9},
          {type: "uncommon", count: 3},
          {type: "rare", count: 1, replacement: "legendary", ratio: 5},
          {type: "foil", count: 1, foil: true}
        ],
        leader: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] !== "Special" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary" ||
            (RARITY[cards[c].defaultRarity] === "Special" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
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
          {type: "common", count: 9},
          {type: "uncommon", count: 3},
          {type: "rare", count: 1, replacement: "legendary", ratio: 5},
          {type: "foil", count: 1, foil: true}
        ],
        leader: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] !== "Special" && cards[c].type === "Leader"),
        poolLeaders: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Special" && cards[c].type === "Leader"),
        poolBases: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type === "Base"),
        common: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader"),
        uncommon: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader"),
        rare: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader"),
        legendary: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary"),
        foil: setsCopy[key].cards.filter(c => RARITY[cards[c].defaultRarity] === "Legendary" ||
            (RARITY[cards[c].defaultRarity] === "Special" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Rare" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Uncommon" && cards[c].type !== "Leader") ||
            (RARITY[cards[c].defaultRarity] === "Common" && cards[c].type !== "Base" && cards[c].type !== "Leader")
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
}
