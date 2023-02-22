import React from "react";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { addTypes } from "../../redux/actions";


  

const DropdownComponent = (props) => {
  return (
    <div className="bg-light p-3">
    <div className="row">
      <div className="col-auto">
        <DropdownButton
          title={props.title}
          variant="secondary"
          onSelect={props.handleSelectType}
        >
          <Dropdown.Item disabled>{props.defaultText}</Dropdown.Item>
          {props.types.map((type, index) => (
            <Dropdown.Item key={index} eventKey={type.name}>
              {type.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="col">
        <Form.Control type="text" onChange = {props.onChange} placeholder="Search" className="w-100" />
      </div>
      <div>
        <input className="col" type="checkbox" onChange={props.onChange} />
        <label>Show only green items </label>
      </div>
    </div>
  </div>
  
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types,
    plpOn: state.plpOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTypes: (payload) => dispatch(addTypes(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownComponent);
