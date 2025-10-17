const cards = require("../data/cards.json");
const cliProgress = require("cli-progress");
const fs = require("fs");
const { default: imgdl } = require("img-dl");

const BATCH_SIZE = 5;

async function downloadAssets () {
  const cardKeys = Object.keys(cards);
  let cardKeyIdx = 0;

  console.log("Processing all, ", cardKeys.length, "cards");
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(cardKeys.length, 0);

  while (cardKeyIdx < cardKeys.length){
    const batch = new Array(BATCH_SIZE).fill("");
    bar1.update(cardKeyIdx);

    await imgdl(
      // Front images
      [
        ...batch.map((_, idx) => {
          if (cardKeyIdx + idx >= cardKeys.length) {
            return null;
          }
          if (fs.existsSync(`./public/cardImages/${cardKeys[cardKeyIdx + idx]}.webp`)) {
            return null;
          }
          const currentCard = cards[cardKeys[cardKeyIdx + idx]];

          if (currentCard.backImagePath.includes("swudb")) {
            return {url: currentCard.frontImagePath.replace("width=300", "width=500"), name: cardKeys[cardKeyIdx + idx]};
          }

          return {url: currentCard.frontImagePath, name: cardKeys[cardKeyIdx + idx]};
        }).filter((l) => !!l),
        ...batch.map((_, idx) => {
          if (cardKeyIdx + idx >= cardKeys.length) {
            return null;
          }
          if (fs.existsSync(`./public/cardImages/${cardKeys[cardKeyIdx + idx]}-back.webp`)) {
            return null;
          }
          const currentCard = cards[cardKeys[cardKeyIdx + idx]];

          if (!currentCard.backImagePath.includes("swudb")) {
            return null;
          }

          return {url: currentCard.backImagePath, name: `${cardKeys[cardKeyIdx + idx]}-back`};
        }).filter((l) => !!l)
      ],
      {
        extension: "webp",
        directory: "./public/cardImages"
      },
    );

    cardKeyIdx += BATCH_SIZE;
  }

  bar1.stop();
}

module.exports = downloadAssets;

downloadAssets();
