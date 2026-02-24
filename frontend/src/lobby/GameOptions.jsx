import React, {Fragment} from "react";
import PropTypes from "prop-types";

import _ from "utils/utils";
import App from "../app";

import SelectSet from "./SelectSet";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

const GameOptions = () => {
  const {
    setsDraft, setsSealed,
    gametype, gamesubtype} = App.state;

  switch (`${gamesubtype} ${gametype}`) {
  case "regular draft":
    return <RegularDraft sets={setsDraft} type={"setsDraft"}/>;
  case "regular sealed":
    return <RegularSealed sets={setsSealed} type={"setsSealed"} />;
  default:
    return null;
  }
};

const RegularDraft = ({sets, type}) => (
  <div>
    <Regular sets={sets} type={type} />
  </div>
);

RegularDraft.propTypes = {
  sets: PropTypes.array,
  type: PropTypes.string
};

const RegularSealed = ({sets, type}) => (
  <Regular sets={sets} type={type} />
);

RegularSealed.propTypes = {
  sets: PropTypes.array,
  type: PropTypes.string
};

const Regular = ({sets, type}) => (
  <Fragment>
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
      Number of packs</InputGroup.Text>
        <Form.Select aria-label="Default select example" value={sets.length} onChange={App._emit("changeSetsNumber", type)}>
          {_.seq(12,1).reverse().map(idx => {
            return <option value={idx} key={idx}>{idx}</option>;
          })}
        </Form.Select>
      </InputGroup>

    </div>
    <div>
      <Sets sets={sets} type={type} />
    </div>
  </Fragment>
);

Regular.propTypes = {
  sets: PropTypes.array,
  type: PropTypes.string
};

const Sets = ({sets, type}) => (
  sets.map((set, i) => {
    return (
      <Row key={i}>
        <Col>
          <SelectSet
            value={App.state[type][i]}
            onChange={setCode => {
              App.state[type][i] = setCode;
              App.save(type, App.state[type]);
            }}
          />
        </Col>
      </Row>
    );
  })
);

export default GameOptions;
