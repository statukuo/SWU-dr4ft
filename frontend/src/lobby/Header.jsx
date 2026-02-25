import React from "react";

import App from "../app";
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import "./Header.scss";

const Header = () => (
  <Container>

    <Row className="justify-content-center">
      <Col xs="6" align="center" className="header">
        <Image src="SWUDr4ft-logo.png" className="logo"/>
      </Col>
      <ServerInfo />
      <ApplicationError />
    </Row>
  </Container>
);

const ApplicationError = () => (
  <p dangerouslySetInnerHTML={{__html: App.err}} className='error' />
);

const ServerInfo = () => {
  const { numUsers, numPlayers, numActiveGames } = App.state;
  const users = `${numUsers} ${numUsers === 1
    ? "user"
    : "users"} connected`;

  const players = `${numPlayers}
     ${numPlayers === 1
    ? "player"
    : "players"}
      playing ${numActiveGames}
        ${numActiveGames === 1
    ? "game"
    : "games"}`;

  return <Container>
    <Row>
      {[users, players].map(((element, key) => {
        return <Col key={key}>
          <Alert variant="info">
            {element}
          </Alert></Col>;
      }))}
    </Row>
  </Container>;
};

export default Header;
