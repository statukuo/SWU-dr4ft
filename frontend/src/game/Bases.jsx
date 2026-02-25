import React from "react";

import _ from "utils/utils";
import App from "../app";
import { ZONE_MAIN } from "../zones";

import "./Bases.scss";
import CardDefault from "./card/CardDefault";
import { Card, Row } from "react-bootstrap";

const BasesPanel = () => {
  if (App.state.didGameStart || App.state.isGameFinished) {
    return (
      <div className="Bases">
        <BasesList />
      </div>
    );
  }
  return null;
};

const BasesList = () => {
  const zone = App.getSortedZone(ZONE_MAIN, "Base");
  const values = _.values(zone);
  const cards = _.flat(values).reverse();

  return (
    <Card>
      <Card.Header>Available Bases</Card.Header>
      <Card.Body>
        <Row xs="2" sm="4">
          {
            cards.map((card, i) => <CardDefault key={i+"Base"+card.name+card.foil} card={card} zoneName={ZONE_MAIN} />)
          }
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BasesPanel;
