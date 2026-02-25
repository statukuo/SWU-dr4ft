import React from "react";

import App from "../app";
import "./GameSettings.scss";
import { Button, ButtonGroup, Card, Form, Row } from "react-bootstrap";

const GameSettings = () => (
  <Card className='fieldset'>
    <Card.Header>Settings</Card.Header>
    <Card.Body>
      <Form.Check
        onChange={() => App.save("chat", !App.state.chat)}
        checked={!!App.state.chat}
        type="checkbox"
        label="Show chat"
        id="chat"
      />
      {!App.state.isSealed &&
        <Form.Check
          onChange={() => App.save("beep", !App.state.beep)}
          checked={!!App.state.beep}
          type="checkbox"
          label="Enable notifications on new packs"
          id="beep"
        />
      }
      {!App.state.isSealed &&
        <Form.Check
          className="pl-10"
          onChange={() => App.save("notify", !App.state.notify)}
          checked={!!App.state.notify}
          type="checkbox"
          disabled={!App.state.beep || App.state.notificationBlocked}
          label={App.state.notificationBlocked ? "Web notifications blocked in browser" : "Use desktop notifications over beep"}
          id="notify"
        />
      }
      {!App.state.isSealed &&
        <Form.Check
          onChange={() => App.save("side", !App.state.side)}
          checked={!!App.state.side}
          type="checkbox"
          label="Add picks to sideboard"
          id="side"
        />
      }
      {!App.state.isSealed &&
        <Form.Check
          onChange={() => App.save("hidepicks", !App.state.hidepicks)}
          checked={!!App.state.hidepicks}
          type="checkbox"
          label="Hide your picks"
          id="hidepicks"
        />
      }
      {!App.state.isSealed &&
        <Form.Check
          onChange={() => App.save("hidebases", !App.state.hidebases)}
          checked={!!App.state.hidebases}
          type="checkbox"
          label="Hide your bases"
          id="hidebases"
        />
      }
      <SortCards />
      {App.state.sort === "aspect" &&
          <PriorityAspects />
      }
    </Card.Body>
    <span>

    </span>
  </Card>
);

const SortCards = () => (
  <Row>
    <h5>Sort card by:</h5>
    <ButtonGroup className="btn-group flex-wrap">
      {["Rarity", "Cost", "Aspect"].map((sort, idx) => {
        const isActive = sort.toLowerCase() === App.state.sort;

        return (
          <Button key={idx} onClick= {e => App.save("sort", sort.toLowerCase())} variant={isActive? "primary" : "outline-primary"}>
            {sort}
          </Button>
        );
      })}
    </ButtonGroup>
  </Row>
);

const PriorityAspects = () => (
  <Row>
    <h5>What aspects to prioritize:</h5>
    <Row sm="2" md="3" lg="6" className="m-0">
      {["Vigilance", "Command", "Aggression", "Cunning", "Villainy", "Heroism"].map((aspect, idx) => {
        const isActive = App.state.aspectPriority.includes(aspect);

        return (
          <Button key={idx} onClick= {e => App.addRemoveAspectPriority(aspect)} variant={isActive? "primary" : "outline-primary"}>
            <img src={`./../media/SWH_Aspects_${aspect}.png`} width="18px" height="18px"/>
            {aspect}
          </Button>
        );
      })}
    </Row>
  </Row>
);

export default GameSettings;
