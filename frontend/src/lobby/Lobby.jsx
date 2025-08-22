import React, {Component} from "react";

import App from "../app";
import {STRINGS} from "../config";

import Header from "./Header";
import GamesPanel from "./GamesPanel";
import NewsPanel from "./NewsPanel";

export default class Lobby extends Component {

  constructor(props) {
    super(props);
    App.register(this);
  }
  render() {
    document.title = STRINGS.BRANDING.SITE_TITLE;
    const { roomInfo } = App.state;

    return (
      <div className="container">
        <div className="lobby">
          <Header/>
          <GamesPanel roomInfo={roomInfo}/>
          {STRINGS.PAGE_SECTIONS.MOTD && <NewsPanel motd={STRINGS.PAGE_SECTIONS.MOTD}/>}
          {STRINGS.BRANDING.PAYPAL}
          {STRINGS.PAGE_SECTIONS.PATREON}
          {STRINGS.PAGE_SECTIONS.FOOTER}
        </div>
      </div>
    );
  }
}
