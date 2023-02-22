import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { addTypes } from "../../redux/actions";

const DropdownComponent = (props) => {
  return (
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


export default connect(mapStateToProps,mapDispatchToProps)(DropdownComponent);

