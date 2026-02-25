import React from "react";
import PropTypes from "prop-types";

import App from "../app";
import { Form } from "react-bootstrap";

const SelectSet = ({ value, onChange }) => {
  const options = Object.entries(App.state.availableSets).reduce((acc, [setType, sets]) => {
    acc.push({
      name: setType, // TODO titlecase
      items: sets.map(set => ({
        name: set.name,
        value: set.code
      }))
    });

    return acc;
  }, [])[0].items; //WE CURRENTLY ONLY HAVE REGULAR SETS so we only need [0].items


  return(
    <Form.Select aria-label="Default select example" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(({name, value}, idx) => {
        return <option value={value} key={idx}>{value} - {name}</option>;
      })}
    </Form.Select>
  );
};

SelectSet.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectSet;
