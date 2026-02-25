import React from "react";

import App from "../app";
import { toTitleCase } from "../utils";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";

const StartPanel = () => {
  const gameType = toTitleCase(App.state.game.type);

  return (
    <Card>
      <Card.Header>Game</Card.Header>
      <Card.Body>
        <Row>
          <Col xs="3" className="align-self-center">
            <p className="text-end"><strong>Type</strong></p>
          </Col>
          <Col xs="9" className="align-self-center">
            <p>{gameType}</p>
          </Col>
        </Row>
        <Row>
          <Col xs="3" className="align-self-center">
            <p className="text-end"><strong>Info</strong></p>
          </Col>
          <Col xs="9" className="align-self-center">
            <p>{App.state.game.packsInfo}</p>
          </Col>
        </Row>
        <PicksPerPack/>
        <Options/>
        <StartControls/>
        <ExitControls/>
      </Card.Body>
    </Card>
  );
};

const PicksPerPack = () => {
  if (App.state.isSealed) {
    return <></>;
  }

  return (<Row>
    <Col xs="3" className="align-self-center">
      <p className="text-end"><strong>Picks per pack</strong></p>
    </Col>
    <Col xs="9" className="align-self-center">
      <p>{App.state.picksPerPack}</p>
    </Col>
  </Row>);
};

const StartControls = () => {
  if (!App.state.isHost || App.state.didGameStart) {
    return <></>;
  }
  return (
    <Row align="center" className="mt-3">
      <Col>
        <Button onClick={App._emit("start")}>
          Start Game
        </Button>
      </Col>
    </Row>
  );
};

const ExitControls = () => {
  if (!App.state.didGameStart) {
    return <></>;
  }

  return (
    <Row align="center" className="mt-3">
      <Col>
        <Button onClick={() => App.send("exitPlayer")} variant="danger">
          Exit game
        </Button>
      </Col>
    </Row>
  );
};

const Options = () => {
  const {gametype} = App.state;
  const isDraft = /draft/.test(gametype);

  if (!App.state.isHost || App.state.didGameStart || !isDraft) {
    return <></>;
  }

  const {useTimer} = App.state;
  const timers = ["Official", "Moderate", "Slow", "Leisurely"];

  return (<Row>
    <Col xs="3" className="align-self-center">
      <p className="text-end"><strong>Options</strong></p>
    </Col>
    <Col xs="9" className="align-self-center">
      <Form>
        {showAddBotsCheckbox()
          ? <Form.Check
            onChange={() => App.save("addBots", !App.state.addBots)}
            checked={!!App.state.addBots}
            type="checkbox"
            label="Fill empty seats with Bots"
            id="fill-bots"
          />
          : null
        }
        {showShufflePlayersCheckbox()
          ? <Form.Check
            onChange={() => App.save("shufflePlayers", !App.state.shufflePlayers)}
            checked={!!App.state.shufflePlayers}
            type="checkbox"
            label="Random seating"
            id="random-seating"
          />
          : null
        }
        <Stack direction="horizontal" gap="4">
          <Form.Check
            onChange={() => App.save("useTimer", !App.state.useTimer)}
            checked={!!App.state.useTimer}
            type="checkbox"
            label="Timer"
            id="game-timming"
          />
          <Form.Select aria-label="Default select example" disabled={!useTimer} value={App.state.timerLength} onChange={(e) => App.save("timerLength", e.target.value)}>
            {timers.map((timer, idx) => {
              return <option value={timer} key={idx}>{timer}</option>;
            })}
          </Form.Select>
        </Stack>
      </Form>
    </Col>
  </Row>);
};

const showAddBotsCheckbox = () => {
  // No need for bots in decadent draft since there's no passing.
  return !App.state.isDecadentDraft;
};

const showShufflePlayersCheckbox = () => {
  // No need to shuffle players in decadent draft because there's no passing.
  return !App.state.isDecadentDraft;
};

export default StartPanel;
