const {pull, times, flatten, uniq, intersection, sortBy, shuffle} = require("lodash");
const {getCardByUuid} = require("../data");

const Player = require("./index");
const logger = require("../logger");

module.exports = class Bot extends Player {
  constructor(picksPerPack, gameId, sets) {
    super({
      isBot: true,
      isConnected: true,
      name: "bot",
      id: "",
      sets
    });
    this.gameId= gameId;
    this.picksPerPack = picksPerPack;
  }

  getPack(pack) {
    const cardsToPick = Math.min(this.picksPerPack, pack.length);
    times(cardsToPick, () => {
      const leaderAspects = uniq(flatten(this.cap?.packs?.["1"]?.map(getCardByUuid).map(card => card.aspects)));
      const otherCardsMatches = uniq(flatten([
        ...["2","3","4"].map(packId => flatten(this.cap?.packs?.[packId]?.map(getCardByUuid).map(card => card.aspects))),
        ...flatten(this.picks.map(getCardByUuid).map(card => card.aspects))
      ]));
      const packWithMatches = pack.map(card => ({
        ...card,
        leaderMatch: intersection(card.aspects, leaderAspects).length,
        otherMatch: intersection(card.aspects, otherCardsMatches).length
      }));

      const selectedCard = sortBy(shuffle(packWithMatches), ["otherMatch", "leaderMatch", "defaultRarity"])[0];

      const randomPick = pack.filter(card => selectedCard.defaultExpansionAbbreviation === card.defaultExpansionAbbreviation && selectedCard.defaultCardNumber === card.defaultCardNumber)[0];
      const swuCardId = `${randomPick.defaultExpansionAbbreviation}_${randomPick.defaultCardNumber}`;
      logger.info(`GameID: ${this.gameId}, Bot, picked: ${randomPick.cardName} ${randomPick.title} (${swuCardId})`);
      this.picks.push(swuCardId);

      pull(pack, randomPick);
    });

    this.emit("pass", pack);
  }
};
