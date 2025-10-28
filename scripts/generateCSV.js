const sets = require("../data/sets.json");
const cards = require("../data/cards.json");

const RARITY = {
  1: "Common",
  2: "Uncommon",
  3: "Rare",
  4: "Legendary",
  5: "Special"
};

const set = process.argv[2];
console.log("PROCESSING ", set);

sets[set].cards.forEach(card => {
  const cardInfo = cards[card];
  const name = cardInfo.title !== "" ? `${cardInfo.cardName}, ${cardInfo.title}` : cardInfo.cardName;
  const aspects = cardInfo.aspects.length? cardInfo.aspects.join(" Icon")+" Icon" : "—";
  const count = cardInfo.type === "Leader" || cardInfo.type === "Base" ? 1 : 3;

  const data = [set, parseInt(cardInfo.defaultCardNumber), "", "", "", name, "", 0,RARITY[cardInfo.rarity], "", cardInfo.type, cardInfo.cost, "", "",aspects, "", "", count];

  console.log(data.join(";"));
});
