import React from "react";

export const STRINGS = {
  BRANDING: {
    SITE_TITLE: ["dr4ft", "info"].join("."),
    SITE_NAME: <span>SWU Draft App</span>,
    DEFAULT_USERNAME: "dr4fter",
    PAYPAL: "",
  },

  PAGE_SECTIONS: {
    MOTD: null, // TODO: handle overwrite of this message of the day; can be a React element

    FOOTER:
      <div className="lobby__contributors">
        <div className="lobby__contributor">
          <span>Contributions welcome!</span>
          <a href='https://github.com/statukuo/SWU-dr4ft' target='_blank' rel='noreferrer' className="link lobby__contributor-link">
            statukuo/SWU-dr4ft
          </a>
        </div>
        <div className="lobby__contributor">
          <span>Based on the awesome work of</span>
          <a href='https://github.com/dr4fters/dr4ft' target='_blank' rel='noreferrer' className="link lobby__contributor-link">
            dr4fters/dr4ft
          </a>
        </div>
      </div>,
    PATREON:
      <div className="lobby__patreon">
        <a href="https://www.patreon.com/bePatron?u=21317292" target='_blank' rel='noreferrer' className="link lobby__patreon-link">
            Help me keep this alive :)
        </a>
      </div>,
    DISCLAIMER:
      <p className="lobby__disclaimer">
        SWUDr4ft is in no way affiliated with Disney or Fantasy Flight Games. Star Wars characters, cards, logos, and art are property of Disney and/or Fantasy Flight Games.
      </p>,
  }
};
