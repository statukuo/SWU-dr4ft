import React, {Component} from "react";

import App from "../app";
import {STRINGS} from "../config";

import Header from "./Header";
import GamesPanel from "./GamesPanel";
import NewsPanel from "./NewsPanel";
import Footer from "./Footer";

export default class Lobby extends Component {

  constructor(props) {
    super(props);
    App.register(this);
  }
  render() {
    document.title = STRINGS.BRANDING.SITE_TITLE;
    const { roomInfo } = App.state;

    return (
      <div className="page">
        <div className="lobby">
          <Header/>
          <GamesPanel roomInfo={roomInfo}/>
          <Footer/>
        </div>
      </div>
    );
  }
}
