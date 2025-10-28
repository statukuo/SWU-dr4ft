import React from "react";

import { STRINGS } from "../config";
import App from "../app";

const Footer = () => (
  <footer className="lobby__footer">
    {STRINGS.PAGE_SECTIONS.MOTD && <NewsPanel motd={STRINGS.PAGE_SECTIONS.MOTD}/>}
    {STRINGS.BRANDING.PAYPAL}
    {STRINGS.PAGE_SECTIONS.PATREON}
    {STRINGS.PAGE_SECTIONS.FOOTER}
    {STRINGS.PAGE_SECTIONS.DISCLAIMER}
  </footer>
);

export default Footer;
