import React, { useState } from "react";

import App from "../app";
import exportDeck from "../export";

import "./DeckSettings.scss";
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { ZONE_MAIN } from "../zones";
import CardPlaceholder from "./card/CardPlaceholder";
import CardDefault from "./card/CardDefault";
import _ from "utils/utils";

const DeckSettings = () => {
  if (App.state.didGameStart || App.state.isGameFinished) {
    return (
      <Card>

        <Card.Header>Game</Card.Header>
        <Card.Body>
          <ExportDeckPanel />

          {
            App.state.isGameFinished && /draft/.test(App.state.gametype)
              ? <DraftLogPanel />
              : null
          }

        </Card.Body>
      </Card>
    );
  }
  return null;
};

const ExportDeckPanel = () => {
  const [leaderSelectShow, setLeaderSelectShow] = useState(false);
  const [baseSelectShow, setBaseSelectShow] = useState(false);

  const activeFormatKey = App.state.exportDeckFormat;
  const activeFormat = exportDeck[activeFormatKey];

  const leaderCard = App.getSortedZone(ZONE_MAIN, "Leader").find(({defaultCardNumber, defaultExpansionAbbreviation}) => defaultCardNumber === App.state.selectedLeader.split("_")[1] && defaultExpansionAbbreviation === App.state.selectedLeader.split("_")[0] );
  const baseCard = App.getSortedZone(ZONE_MAIN, "Base").find(({defaultCardNumber, defaultExpansionAbbreviation}) => defaultCardNumber === App.state.selectedBase.split("_")[1] && defaultExpansionAbbreviation === App.state.selectedBase.split("_")[0] );

  return (
    <Container>
      <Modal show={leaderSelectShow} onHide={() => setLeaderSelectShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select leader</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            _.flat(_.values(App.getSortedZone(ZONE_MAIN, "Leader"))).reverse().map((card, i) => <CardDefault key={i+"Leader"+card.name+card.foil} card={card} zoneName={ZONE_MAIN} />)
          }
        </Modal.Body>
      </Modal>
      <Modal show={baseSelectShow} onHide={() => setBaseSelectShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select leader</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            _.flat(_.values(App.getSortedZone(ZONE_MAIN, "Base"))).reverse().map((card, i) => <CardDefault key={i+"Base"+card.name+card.foil} card={card} zoneName={ZONE_MAIN} />)
          }
        </Modal.Body>
      </Modal>
      <Row>
        <Col xs="12" md="6" align="center">
          {!leaderCard && <CardPlaceholder horizontal/>}
          {leaderCard && <CardDefault card={leaderCard} staticCard/>}
          <Button onClick={() => setLeaderSelectShow(true)}>
            Select Leader
          </Button>
        </Col>
        <Col xs="12" md="6" align="center">
          {!baseCard && <CardPlaceholder horizontal/>}
          {baseCard && <CardDefault card={baseCard} staticCard/>}
          <Button onClick={() => setBaseSelectShow(true)}>
            Select Base
          </Button>
        </Col>
      </Row>
      <h4>Deck Export</h4>

      <Tabs
        activeKey={activeFormatKey}
        onSelect={(formatKey) => App.save("exportDeckFormat", formatKey)}
        id="export-tab"
        className="mb-3"
      >
        {
          Object.entries(exportDeck).map(([formatKey, format], idx) => {
            if (!format) return null;
            return (
              <Tab
                eventKey={formatKey}
                title={format.name}
                key={idx}
              >
                {
                  activeFormat && activeFormat.download && App.state.selectedLeader && App.state.selectedBase
                    ? (
                      <Row>
                        <Form>
                          <InputGroup className="mb-3">

                            <Form.Control placeholder='filename' value={App.state.exportDeckFilename} onChange={e => App.save("exportDeckFilename", e.currentTarget.value) } />
                            <InputGroup.Text id="extension">
                              {format.downloadExtension}
                            </InputGroup.Text>
                            <Button onClick={(e) => {e.preventDefault(); App._emit("download")();}}>
                              <i className="icon ion-android-download" /> Download
                            </Button>
                            {
                              activeFormat.copy &&
                              <Button onClick={(e) => {e.preventDefault(); App._emit("copy")();}} variant="info">
                                <i className="icon ion-android-clipboard" /> Copy to clipboard
                              </Button>
                            }
                          </InputGroup>
                        </Form>
                      </Row>
                    )
                    : <span>Please select a Leader and a Base</span>
                }
                {
                  activeFormat && activeFormat.copy && !activeFormat.download && App.state.selectedLeader && App.state.selectedBase
                    ? (
                      <Row>
                        <Col>
                        </Col>
                      </Row>
                    )
                    : null
                }
              </Tab>
            );
          })
        }
      </Tabs>
    </Container>
  );
};

const DraftLogPanel = () => (

  <Container>
    <h4>Draft log</h4>
    <Row>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="extension">
            {App.state.exportDeckFilename + "-draftlog.txt" }
          </InputGroup.Text>
          <Button onClick={(e) => {e.preventDefault(); App._emit("getLog")();}}>
            <i className="icon ion-android-download" /> Download log
          </Button>
        </InputGroup>
      </Form>
    </Row>
  </Container>
);

export default DeckSettings;
