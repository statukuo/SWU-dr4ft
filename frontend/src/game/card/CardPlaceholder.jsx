import React from "react";
import PropTypes from "prop-types";
import "./CardPlaceholder.scss";
import { Card } from "react-bootstrap";

const CardPlaceholder = ({horizontal}) => {
  return (<Card className="CardPlaceholder">
    <Card.Img variant="top" src={`/cardImages/placeholder_${horizontal? "horizontal" : "vertical"}.webp`} />
  </Card>);
};


CardPlaceholder.propTypes = {
  horizontal: PropTypes.boolean
};

export default CardPlaceholder;
