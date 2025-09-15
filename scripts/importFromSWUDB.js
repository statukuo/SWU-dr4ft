const fs = require("fs");
const cliProgress = require("cli-progress");
const generateBoosterInfo = require("./generateBoosterData");

const ASPECTS = {
  1: "Aggression",
  2: "Command",
  3: "Cunning",
  4: "Vigilance",
  5: "Heroism",
  6: "Villainy"
};


async function importSet() {
  const allSets = await (await fetch("https://swudb.com/api/card/getAllSets")).json();

  const setsToFetch = allSets.filter(({ cardCount }) => cardCount);
  let cardIdx = 1;
  let setIdx = 0;

  const sets = {};
  const cards = {};
  const cardsByName = {};

  const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: " {bar} | {filename} | {value}/{total}",
  }, cliProgress.Presets.shades_grey);


  const bar1 = multibar.create(0, 0);
  const bar2 = multibar.create(0, 0);

  while (setIdx < setsToFetch.length) {
    console.log("Started processing ", setsToFetch[setIdx].expansionAbbreviation, "total base cards:", setsToFetch[setIdx].cardCount);
    cardIdx = 1;
    let totalCardProcessed = 0;

    bar1.setTotal(setsToFetch[setIdx].cardCount);
    while (cardIdx <= setsToFetch[setIdx].cardCount) {
      bar1.update(cardIdx, {filename: setsToFetch[setIdx].expansionAbbreviation});

      const response = await fetch("https://swudb.com/api/card/getPrintingInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: String(cardIdx).padStart(3, "0"),
          expansionAbbreviation: setsToFetch[setIdx].expansionAbbreviation,
          language: ""
        })
      });
      const data = await response.json();

      if (data.cardId) {
        const formattedCardNumber = (number) => String(number).padStart(3, "0");
        const baseCardCode = `${setsToFetch[setIdx].expansionAbbreviation}_${formattedCardNumber(cardIdx)}`;
        const cardName = data.title !== "" ? `${data.cardName}, ${data.title}` : data.cardName;

        //Card whole collection
        let alternativeIdx = 0;


        bar2.setTotal(data.alternativePrintings.length);
        while (alternativeIdx < data.alternativePrintings.length) {
          bar2.update(alternativeIdx, {filename: formattedCardNumber(cardIdx)});
          const altCardCode = `${data.alternativePrintings[alternativeIdx].expansionAbbreviation}_${formattedCardNumber(data.alternativePrintings[alternativeIdx].cardNumber)}`;

          if (!cards[altCardCode]) {
            const alternativeResponse = await fetch("https://swudb.com/api/card/getPrintingInfo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cardNumber: formattedCardNumber(data.alternativePrintings[alternativeIdx].cardNumber),
                expansionAbbreviation: data.alternativePrintings[alternativeIdx].expansionAbbreviation,
                language: ""
              })
            });
            const alt = await alternativeResponse.json();

            cards[altCardCode] = {
              defaultExpansionAbbreviation: data.alternativePrintings[alternativeIdx].expansionAbbreviation,
              cardName: alt.cardName,
              title: alt.title,
              defaultCardNumber: formattedCardNumber(data.alternativePrintings[alternativeIdx].cardNumber),
              defaultImagePath: `https://swudb.com/cdn-cgi/image/width=300/images/${alt.frontImagePath}`.replaceAll("~/", "").replaceAll("//", "/"),
              frontImagePath: `https://swudb.com/cdn-cgi/image/width=300/images/${alt.frontImagePath}`.replaceAll("~/", "").replaceAll("//", "/"),
              backImagePath: (alt.backImagePath ? `https://swudb.com/cdn-cgi/image/width=300/images/${alt.backImagePath}`.replaceAll("~/", "").replaceAll("//", "/") : "https://karabast.net/card-back.png").replaceAll("~/", ""),
              aspects: alt.aspects.map(aspect => ASPECTS[aspect]),
              rarity: data.alternativePrintings[0].rarity,
              cost: data.cost,
              type: alt.cardTypeDescription
            };
          }
          totalCardProcessed++;
          alternativeIdx++;
        }

        //Cards by name
        if (!cardsByName[cardName]) {
          cardsByName[cardName] = {
            default: baseCardCode
          };
        }

        Object.entries(data.alternativePrintings).forEach(([entry, value]) => {
          if (!cardsByName[cardName][value.expansionAbbreviation]) {
            cardsByName[cardName][value.expansionAbbreviation] = {};
          }

          cardsByName[cardName][value.expansionAbbreviation][formattedCardNumber(value.cardNumber)] = baseCardCode;
        });

        //Set collection
        if (setsToFetch[setIdx].expansionType === 1 && setsToFetch[setIdx].formatLegality !== 0) {
          if (!sets[setsToFetch[setIdx].expansionAbbreviation]) {
            sets[setsToFetch[setIdx].expansionAbbreviation] = {
              cards: [],
              code: setsToFetch[setIdx].expansionAbbreviation,
              releaseDate: setsToFetch[setIdx].releaseDate,
              baseSetSize: setsToFetch[setIdx].cardCount,
              name: setsToFetch[setIdx].expansionName
            };
          }

          sets[setsToFetch[setIdx].expansionAbbreviation].cards.push(baseCardCode);
        }
      }

      cardIdx++;

    }

    bar1.stop();
    bar2.stop();

    console.log("");
    console.log("");
    console.log("Total cards processed:", totalCardProcessed);

    setIdx++;
  }

  try {
    fs.writeFileSync("data/cards.json", JSON.stringify(cards, null, 2));
    console.log("DONE with cards");
  } catch (error) {
    console.log("ERROR writing cards");
  }


  try {
    fs.writeFileSync("data/cubable_cards_by_name.json", JSON.stringify(cardsByName, null, 2));
    console.log("DONE cards by name");
  } catch (error) {
    console.log("ERROR writing cards");
  }


  try {
    fs.writeFileSync("data/sets.json", JSON.stringify(generateBoosterInfo(sets, cards), null, 2));
    console.log("DONE with sets");
  } catch (error) {
    console.log("ERROR writing cards");
  }

  process.exit();
}

importSet();
