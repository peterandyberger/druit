import React from "react";
import { connect } from "react-redux";
import { addTypes } from "../../redux/actions";
import { Card, Button } from "react-bootstrap";

const Pdp = (props) => {
  const {
    name,
    weight,
    height,
    onClick,
    catched,
    button_className,
    button_text,
    abilities,
    sprites,
  } = props;

  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div></div>
        <button
          type="button"
          onClick={onClick}
          class="btn-close"
          aria-label="Close"
        ></button>
      </Card.Header>
      <Card.Img variant="top" src={imgUrl + props.imgindex + ".png"} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Weight: {weight}</Card.Text>
        <Card.Text>Height: {height}</Card.Text>
        <Card.Text>
          Abilities:{" "}
          {abilities
            ? abilities
                .filter((ability) => !ability.is_hidden)
                .map((ability) => ability.ability.name)
                .join(", ")
            : "none"}
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
