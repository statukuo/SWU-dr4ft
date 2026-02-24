import React, {Component} from "react";

import App from "../app";

import PlayersPanel from "./PlayersPanel";
import StartPanel from "./StartPanel";
import DeckSettings from "./DeckSettings";
import GameSettings from "./GameSettings";
import Grid from "./Grid";
import Chat from "./Chat";
import {STRINGS} from "../config";
import "./Game.scss";

import "vanilla-toast/vanilla-toast.css";
import {ZONE_MAIN, ZONE_PACK, ZONE_SIDEBOARD} from "../zones";
import LeadersPanel from "./Leaders";
import BasesPanel from "./Bases";
import { Button, Col, Container, Offcanvas, Row, Toast, ToastContainer } from "react-bootstrap";

export default class Game extends Component {
  constructor(props) {
    super(props);
    App.register(this);

    this.state = {
      showToast: App.state.name === STRINGS.BRANDING.DEFAULT_USERNAME,
      showSettings: false,
      showLeaders: false
    };
  }

  leaveGame() {
    App.send("leave");
  }

  componentDidMount() {
    // Alert to change name
    if (App.state.name === STRINGS.BRANDING.DEFAULT_USERNAME) {
      //vanillaToast.warning(, {duration: 5000});
    }

    window.addEventListener("beforeunload", this.leaveGame);
  }

  componentWillUnmount() {
    this.leaveGame();
    window.removeEventListener("beforeunload", this.leaveGame);
  }

  render() {
    return (
      <Container fluid>
        <ToastContainer className="p-3" position="middle-center" style={{ zIndex: 1 }}
        >
          <Toast onClose={() => this.setState({showToast: false})} show={this.state.showToast} delay={3000} autohide bg="warning">
            <Toast.Body>{`Welcome, ${App.state.name}! Please update your nickname via the 'Players' widget in the left side.`}</Toast.Body>
          </Toast>
        </ToastContainer>
        <audio id='beep' src='/media/beep.wav'/>
        <Row className="justify-content-md-center">
          {!App.state.didGameStart && !App.state.isGameFinished &&
            <Col lg="3">
              <StartPanel/>
              <PlayersPanel/>
              <GameSettings/>
            </Col>
          }
          {
            App.state.didGameStart &&
            <>
              <Col lg="3" className="d-none d-xl-block">
                <StartPanel/>
                <GameSettings/>
              </Col>

              <Col lg="12" xl="6">
                {App.state.isGameFinished && <DeckSettings/>}
                <CardsZone/>
                {App.state.chat && <Chat/>}
              </Col>

              <Col lg="3" className="d-none d-xl-block">
                <PlayersPanel/>
                <LeadersPanel/>
                {(!App.state.hidebases || App.state.isGameFinished) && <BasesPanel/>}
              </Col>

              <Offcanvas show={this.state.showSettings} onHide={() => this.setState({showSettings: false})}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <StartPanel/>
                  <GameSettings/>
                </Offcanvas.Body>
              </Offcanvas>

              <Offcanvas show={this.state.showLeaders} onHide={() => this.setState({showLeaders: false})} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Draft</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <PlayersPanel/>
                  <LeadersPanel/>
                  {(!App.state.hidebases || App.state.isGameFinished) && <BasesPanel/>}
                </Offcanvas.Body>
              </Offcanvas>

              <div className="d-block d-xl-none">

                <Button className="btn-settings" onClick={() => this.setState({showSettings: true})}>
                Settings {">>"}
                </Button>
                <Button className="btn-leaders" onClick={() => this.setState({showLeaders: true})}>
                  {"<<"} Leaders
                </Button>

              </div>
            </>
          }
        </Row>
      </Container>
    );
  }
}

const CardsZone = () => {
  const pack = !App.state.isGameFinished && App.state.didGameStart
    ? <Grid key={"pack"} zones={[ZONE_PACK]} />
    : <div key={"pack"}/>;

  const props = { zones: [ZONE_MAIN, ZONE_SIDEBOARD] };
  const pool = <Grid key={"pool"} {...props} filter={"Rest"}/>;

  return !App.state.hidepicks || App.state.isGameFinished
    ? [pack, pool]
    : [pack];
};
