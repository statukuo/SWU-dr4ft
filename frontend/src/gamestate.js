import {countBy, findIndex, pullAt, range, remove, sortBy, intersection} from "lodash";
import _ from "utils/utils";
import EventEmitter from "events";
import {ZONE_JUNK, ZONE_MAIN, ZONE_PACK, ZONE_SIDEBOARD} from "./zones";
import BASIC_LANDS_BY_COLOR_SIGN from "./basiclands";


const defaultState = () => ({
  [ZONE_MAIN]: [],
  [ZONE_SIDEBOARD]: [],
  [ZONE_PACK]: [],
  [ZONE_JUNK]: []
});

/**
 * @desc Map<cardId, zoneName>
 * @example { "cardId": "main", "othercardId": "side}
 */
const defaultCardState = () => ({});

/**
 * @desc Map<zoneName, Map<color, count>
 * @example { "main": {"W": 2, "R": 3}, "side": {"B": 5, "U": 5} }
 */
const defaultLandDistribution = () => ({
  [ZONE_MAIN]: {},
  [ZONE_SIDEBOARD]: {},
});

/**
 * @desc contains the cards in all zone, the pick + burn references and the land distributions
 * it is saved at every App update
 */
class GameState extends EventEmitter {
  #state;
  #zoneState;
  #landDistribution;
  #pickCardIds;
  #burnCardIds;
  #picksPerPack;

  constructor({
    state = defaultCardState(),
    landDistribution = defaultLandDistribution(),
    pickCardIds = [],
    burnCardIds = []
  } = {
    state: defaultCardState(),
    landDistribution: defaultLandDistribution(),
    pickCardIds: [],
    burnCardIds: []
  }) {
    super();
    this.#state = state;
    this.#landDistribution = landDistribution;
    this.#zoneState = defaultState();
    this.#pickCardIds = pickCardIds;
    this.#burnCardIds = burnCardIds;
  }

  /**
   * @param zoneName
   * @returns {array} the cards present in the zone
   */
  get(zoneName) {
    return this.#zoneState[zoneName];
  }
  getAutopickCardIds(){
    return this.#pickCardIds;
  }
  countCardsByName(zoneName, fun = ({name}) => name) {
    return this.countCardsBy(zoneName, fun);
  }

  countCardsBy(zoneName, fun) {
    const zone = this.get(zoneName);
    return countBy(zone, fun);
  }

  pack(cards) {
    this.#zoneState[ZONE_PACK] = cards;
    this.updState();
  }

  add(zoneName, card) {
    const zone = this.get(zoneName);
    zone.push(card);
    if (card.cardId) {
      this.#state[card.cardId] = zoneName;
    }
  }

  move(fromZone, toZone, card) {
    const src = this.get(fromZone);
    const cardIndex = findIndex(src, card);
    pullAt(src, cardIndex);
    this.add(toZone, card);
    this.updState();
  }

  /**
   *
   * @param {string} zoneName
   * @param {array} cards
   */
  addToPool(zoneName, cards) {
    Object.entries(this.#landDistribution).forEach(([zoneName, landsRepartition]) => {
      Object.entries(landsRepartition).forEach(([colorSign, number]) => {
        const basicLand = BASIC_LANDS_BY_COLOR_SIGN[colorSign];
        this._setLands(zoneName, basicLand, number);
      });
    });

    cards
      .forEach((card) => {
        const knownZone = this.#state[card.cardId];
        this.add(knownZone || zoneName, card);
      });
    this.updState();
  }

  _setLands(zoneName, card, n) {
    const zone = this.get(zoneName);
    remove(zone, (c) => c.name === card.name);
    // add n land
    range(n).forEach(() => zone.push(card));
    this.#landDistribution[zoneName][card.colorIdentity[0]] = n;
  }

  setLands(zoneName, color, n) {
    this._setLands(zoneName, BASIC_LANDS_BY_COLOR_SIGN[color], n);
    this.updState();
  }

  getMainDeckSize() {
    return this.get(ZONE_MAIN).length;
  }

  getSortedZone(zoneName, sort, aspectPriority, filter) {
    const cards = this.get(zoneName);
    let filteredCards;
    if (filter) {
      switch (filter) {
      case "Leader":
        filteredCards = cards.filter(card => card.type === "Leader");
        break;
      case "Base":
        filteredCards = cards.filter(card => card.type === "Base");
        break;
      case "Rest":
        filteredCards = cards.filter(card => card.type !== "Base" && card.type !== "Leader");
        break;
      }
    }

    if (sort === "aspect") {
      return sortBy(filteredCards || cards, (card) => intersection(card.aspects, aspectPriority).length);
    }

    return sortBy(filteredCards || cards, [sort]);
  }

  updState() {
    this.emit("updateGameState", {
      state: this.#state,
      landDistribution: this.#landDistribution,
      pickCardIds: this.#pickCardIds,
      picksPerPack: this.#picksPerPack,
      burnCardIds: this.#burnCardIds
    });
  }

  updateSelection() {
    this.emit("setSelected", {
      picks: this.#pickCardIds,
      burns: this.#burnCardIds
    });
  }

  isPick(cardId) {
    return this.#pickCardIds.includes(cardId.toString());
  }

  isBurn(cardId) {
    return this.#burnCardIds.includes(cardId.toString());
  }

  updateCardPick(cardId, picksPerPack) {
    if (this.#pickCardIds.length == picksPerPack) {
      this.#pickCardIds.shift();
    }

    if (this.isBurn(cardId)) {
      remove(this.#burnCardIds, id => id === cardId);
    }

    this.#pickCardIds.push(cardId);
    this.updState();
    this.updateSelection();
  }

  resetPack() {
    this.get(ZONE_PACK).length = 0;
    this.#pickCardIds = [];
    this.#burnCardIds = [];
  }

  updateCardBurn(cardId, burnsPerPack) {
    if (burnsPerPack <= 0) {
      return false;
    }

    if (this.#burnCardIds.length == burnsPerPack) {
      this.#burnCardIds.shift();
    }

    if (this.isPick(cardId)) {
      remove(this.#pickCardIds, id => id === cardId);
    }

    this.#burnCardIds.push(cardId);
    this.updState();
    this.updateSelection();
  }

  isSelectionReady(picksPerPack, burnsPerPack) {
    const packLength = this.get(ZONE_PACK).length;

    if (packLength === (this.#pickCardIds.length + this.#burnCardIds.length)) {
      return true;
    }

    if (picksPerPack != this.#pickCardIds.length) {
      return false;
    }

    if (burnsPerPack != this.#burnCardIds.length) {
      return false;
    }

    return true;
  }
}

export default GameState;
