import React from "react";
import { connect } from "react-redux";
import { addTypes } from "../../redux/actions";
import { Card } from "react-bootstrap";

const Pdp = (props) => {
  const {
    imgindex,
    name,
    weight,
    height,
    abilities,
    catched,
    button_text,
    button_className,
  } = props;

  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div></div>
        <button
          type="button"
          onClick={props.onClick}
          className="btn-close"
          aria-label="Close"
        />
      </Card.Header>
      <Card.Img variant="top" src={`${imgUrl}${imgindex}.png`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Weight: {weight}</Card.Text>
        <Card.Text>Height: {height}</Card.Text>
        <Card.Text>
          Abilities:{" "}
          {abilities
            ?.filter((ability) => !ability.is_hidden)
            ?.map((ability) => ability.ability.name)
            ?.join(", ") || "none"}
        </Card.Text>
        <button onClick={catched} type="button" className={button_className}>
          {button_text}
        </button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types,
    names: state.names,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTypes: (payload) => dispatch(addTypes(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pdp);
