import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import _ from "utils/utils";

import App from "../app";
import { toTitleCase } from "../utils";
import GameOptions from "./GameOptions";

import "./CreateGameButton.scss";
import { Button, Col, Container, Form, Modal, Row, Stack } from "react-bootstrap";

// set this out here so the create button has the capability
// to open the modal
let showModal;
let createModalButtonRef;

const ModalSection = (props) => {
  if (props.hide) {
    return null;
  }

  return (
    <div className="modal-section">
      <label htmlFor={props.inputId}>{props.label}</label>
      <div className={"modal-section-content " + props.className}>{props.children}</div>
    </div>
  );
};

ModalSection.propTypes = {
  hide: PropTypes.bool,
  label: PropTypes.string,
  inputId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

const CreateRoomModal = () => {
  const [open, setOpen] = useState(false);
  const draftNameInput = useRef();

  showModal = () => {
    setOpen(true);
    // must wait for the modal to be open
    // before we can focus on the input
    setTimeout(() => {
      draftNameInput.current.focus();
    }, 200);
  };

  const closeModal = () => {
    setOpen(false);
    createModalButtonRef.current.focus();
  };

  const {title, seats, gametype, isPrivate} = App.state;
  const gameTypes = ["draft", "sealed"];

  return (
    <Modal show={open} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Game Room Name</Form.Label>
              <Form.Control type="text" placeholder="Enter game room name" onChange={(e) => {App.save("title", e.currentTarget.value);}} value={title} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Game Type</Form.Label>
              <Stack gap={2} className="col-md-5 mx-auto" direction="horizontal">
                {gameTypes.map((gameType, idx) => {
                  return <Button
                    key={idx}
                    id={`gameType-${gameType}`}
                    onClick={(e) => {
                      e.preventDefault();
                      App.save("gametype", gameType);
                      App.save("gamesubtype", "regular");
                    }}
                    variant={gametype === gameType ? "success" : "outline-primary"}
                  >
                    {toTitleCase(gameType)}
                  </Button>;
                })}
              </Stack>
            </Form.Group>

            <Form.Group controlId="formGridCity">
              <Form.Label>Players</Form.Label>

              <Row className="mb-3">
                <Col>
                  <Form.Control type="number" placeholder="8" onChange={(e) => App.save("seats", e.currentTarget.value)} value={seats} />
                </Col>
                <Col className="align-self-center">
                  <Form.Check
                    type="switch"
                    label="Private"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onChange={() => App.save("isPrivate", !isPrivate)}
                    value={isPrivate}
                  />
                </Col>
              </Row>
            </Form.Group>

            <GameOptions/>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={App._emit("create")}>
            Create Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CreateGameButton = () => {
  createModalButtonRef = useRef(null);

  return (
    <div className="CreateGameButton">
      <CreateRoomModal />
      <Button ref={createModalButtonRef} onClick={() => showModal()} variant="success">
        Create Game
      </Button>
    </div>
  );
};

export default CreateGameButton;
