import React, { Component } from "react";
import PropTypes from "prop-types";

import App from "../../app";
import "./CardBase.scss";
import SelectionState from "./SelectionState.jsx";
import { ZONE_PACK } from "../../zones";
import { Card } from "react-bootstrap";

const DEFAULT = 0;
const FLIP = 1;

export default class CardBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardLang: App.state.cardLang,
      cardSize: App.state.cardSize,
      url: this.getCardImage(DEFAULT),
      isFlipped: false, // this is relative to this.props.showFlipped
      imageErrored: false,
    };
  }

  getCardImage(side) {
    const { card } = this.props;
    const set = card.defaultExpansionAbbreviation;
    const number = String(card.defaultCardNumber).padStart(3, "0");
    if (side === FLIP && card.type === "Leader")
      return `/cardImages/${set}_${number}-back.webp` || `/cardImages/${set}_${number}.webp`;

    return `/cardImages/${set}_${number}.webp`;
  }

  flip(event) {
    event.stopPropagation();
    this.setState({ isFlipped: !this.state.isFlipped });
    this.setState({ url: this.getCardImage(this.state.isFlipped? FLIP : DEFAULT) });
  }

  onImageError() {
    this.setState({ imageErrored: true });
  }

  handleCardSelection(card, swuCardId) {
    if (this.props.staticCard) {
      return;
    }

    if (card.type === "Leader") {
      App.updateSelectedLeader(swuCardId);
    }

    if (card.type === "Base") {
      App.updateSelectedBase(swuCardId);
    }
  }

  render() {
    if (
      this.state.cardSize !== App.state.cardSize ||
      this.state.cardLang !== App.state.cardLang
    ) {
      this.setState({
        cardLang: App.state.cardLang,
        cardSize: App.state.cardSize,
      });
    }

    const { card } = this.props;

    const _class = [
      "CardBase",
      card.foil ? "-foil" : "",
      card.layout === "flip" &&
      (card.type === "Leader" || this.state.isFlipped) &&
      (card.type === "Leader") != this.state.isFlipped
        ? "-rotate"
        : "",
      card.type === "Base"? "-base":""
    ].join(" ");

    const base = card.type === "Base";
    const isPick = this.props.zoneName === ZONE_PACK && App.state.gameState.isPick(card.cardId);
    const swuCardId = `${card.defaultExpansionAbbreviation}_${card.defaultCardNumber}`;
    const isLeaderSelected = card.type === "Leader" && swuCardId === App.state.selectedLeader;
    const isBaseSelected = card.type === "Base" && swuCardId === App.state.selectedBase;

    return (
      <Card className={_class} onClick={() => this.handleCardSelection(card, swuCardId)}>
        <Card.Img variant="top" src={this.getCardImage(this.state.isFlipped ? FLIP : DEFAULT)} />
        {this.props.children}

        {card.type==="Leader" &&
        <div className="flip-button">
          <button onClick={(e) => this.flip(e)}>
            <i className="icon ion-android-refresh" />
          </button>
        </div>
        }
        {!this.props.staticCard &&
          <SelectionState selection isPick={isLeaderSelected} card={card} isRotated={this.state.isFlipped}/>
        }
        {!this.props.staticCard &&
          <SelectionState selection isPick={isBaseSelected} card={card} isRotated={this.state.isFlipped} base={base}/>
        }
        <SelectionState isPick={isPick} card={card} isRotated={this.state.isFlipped} base={base}/>
      </Card>
    );
  }
}

CardBase.propTypes = {
  card: PropTypes.object.isRequired,
  zoneName: PropTypes.string,
  showFlipped: PropTypes.bool, // whether the card should be flipped by default,
  staticCard:  PropTypes.bool
};
