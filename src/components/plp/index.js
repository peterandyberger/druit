import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import './index.css';
import {
  addTypes,
  addNames,
  showPDP,
  showPLP,
  storePokemon,
} from "../../redux/actions";
import pokemonApi from "../../api/index";

const Plp = (props) => {
  const { names } = props;

  const [catched, setCatched] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItem")) || [];
    setCatched(items);
  }, []);

  const handleClick = (name) => {
    getPokemonData(name);
    props.showPDP(true);
    props.showPLP(false);
  };

  const getPokemonData = async (pokemon) => {
    try {
      const response = await pokemonApi.get("pokemon/" + pokemon, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.storePokemon(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCatched = (url) => {
    const parts = url.split('/');
    const id = parts[parts.length - 2];
    console.log(catched, catched?.includes(parseInt(id)), parseInt(id));
    return catched?.includes(parseInt(id));
  };

  return (
    <>
      {" "}
      {catched && (
        <ListGroup>
          {names?.pokemon?.map((item, index) => (
            <ListGroup.Item
             //className={catched.includes((item.pokemon.url.split('/')[item.pokemon.url.split('/').length -2])) ? "green" : "red"}
             className={checkCatched(item.pokemon.url) ? "green" : "red"}
              key={index}
              onClick={() => handleClick(item.pokemon.name)}
            >
              <p>{item.pokemon.name}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types,
    names: state.names,
    pokemon: state.pokemon,
    pdpON: state.pdpON,
    plpON: state.plpON,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTypes: (payload) => dispatch(addTypes(payload)),
    addNames: (payload) => dispatch(addNames(payload)),
    showPDP: (payload) => dispatch(showPDP(payload)),
    showPLP: (payload) => dispatch(showPLP(payload)),
    storePokemon: (payload) => dispatch(storePokemon(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plp);
