import React from "react";

import _ from "utils/utils";
import App from "../app";
import { ZONE_MAIN } from "../zones";

import "./Leaders.scss";
import CardDefault from "./card/CardDefault";
import { Card, Row } from "react-bootstrap";

const LeadersPanel = () => {
  if (App.state.didGameStart || App.state.isGameFinished) {
    return (
      <div className="Leaders">
        <LeadersList />
      </div>
    );
  }
  return null;
};

const LeadersList = () => {
  const zone = App.getSortedZone(ZONE_MAIN, "Leader");
  const values = _.values(zone);
  const cards = _.flat(values).reverse();

  return (
    <Card>
      <Card.Header>Picked Leaders</Card.Header>
      <Card.Body>
        <Row xs="1" sm="2">
          {
            cards.map((card, i) => <CardDefault key={i+"Leader"+card.name+card.foil} card={card} zoneName={ZONE_MAIN} />)
          }
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LeadersPanel;
