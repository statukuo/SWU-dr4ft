import React from "react";

import App from "../app";
import exportDeck from "../export";

import "./DeckSettings.scss";
import { Button, Card, Col, Container, Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";

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
  const activeFormatKey = App.state.exportDeckFormat;
  const activeFormat = exportDeck[activeFormatKey];

  return (
    <Container>
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
            console.log(formatKey);
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
