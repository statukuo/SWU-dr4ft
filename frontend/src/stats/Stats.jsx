import React, {Component} from "react";

import App from "../app";
import {STRINGS} from "../config";
import { Card, Col, Container, Row } from "react-bootstrap";
import { LineChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";

export default class Stats extends Component {

  constructor(props) {
    super(props);
    App.register(this);

    App.getStats();
  }
  render() {
    document.title = STRINGS.BRANDING.SITE_TITLE;

    console.log(App.state.stats);

    return (
      <Container fluid="lg">
        <Row className="stats">
          <Col xs="12" md="6" lg="4" xl="3">
            <Card>
              <Card.Header align="center">
              Draft number
              </Card.Header>
              <Card.Body align="center">
                <h1>{App.state.stats.draftCount}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <Card>
              <Card.Header align="center">
              Sealed number
              </Card.Header>
              <Card.Body align="center">
                <h1>{App.state.stats.sealedCount}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <Card>
              <Card.Header align="center">
              Unique players
              </Card.Header>
              <Card.Body align="center">
                <h1>{App.state.stats.playerCount}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <Card>
              <Card.Header >
              Booster packs opened
              </Card.Header>
              <Card.Body>
                <PieChart data={App.state.stats.boosterPacks} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
