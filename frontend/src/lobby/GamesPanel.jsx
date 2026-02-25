import React from "react";
import PropTypes from "prop-types";

import CreateGameButton from "./CreateGameButton";

import "./GamesPanel.scss";
import { Card, Table, Container, Row } from "react-bootstrap";

const GamesPanel = ({roomInfo}) => {
  return (
    <Container>
      <Card className='GamesPanel fieldset'>

        <Card.Header>Games</Card.Header>
        <Card.Body>

          {roomInfo.length
            ? <Table className='join-game-table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Infos</th>
                  <th>Players</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {roomInfo.map(room => <tr key={room}>
                  <td>{room.title}</td>
                  <td>{room.type}</td>
                  <td>{room.packsInfo}</td>
                  <td>{room.usedSeats}/{room.totalSeats}</td>
                  <td>
                    <a href={`#g/${room.id}`} className='join-game-link'>
                      <div>Join game</div>
                    </a>
                  </td>
                </tr>)}
              </tbody>
            </Table>
            : "There are no public rooms open currently."}
          <Container>
            <Row align="center">
              <CreateGameButton />
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

GamesPanel.propTypes = {
  roomInfo: PropTypes.array
};

export default GamesPanel;
