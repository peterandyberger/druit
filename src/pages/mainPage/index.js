import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { addTypes, addNames, showPDP, showPLP } from "../../redux/actions";
import { connect } from "react-redux";
import Plp from "../../components/plp";
import pokemonApi from "../../api/index";
import Pdp from "../../components/pdp";

const MAINPAGE = (props) => {
  const [selectedType, setSelectedType] = useState();
  const [spinner, setSpinner] = useState(true);

  const handleSelectType = (type) => {
    setSelectedType(type);
    createList(type);
  };

  const getTypes = async () => {
    const response = await pokemonApi.get("type", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.addTypes(response.data.results);
  };

  useEffect(() => {
    getTypes();
    setSpinner(false);
  }, []);

  const createList = async (type) => {
    try {
      const response = await pokemonApi.get("type/" + type, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.addNames(response.data);
      props.showPLP(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCard = () => {
    props.showPDP(false);
    props.showPLP(true);
  };

  const recordCatch = () => {
    var items = JSON.parse(localStorage.getItem("selectedItem")) || [];
    console.log(items);
    !items?.includes(props.pokemon.id) && items.push(props.pokemon.id);
    localStorage.setItem("selectedItem", JSON.stringify(items));
  };
  return (
    <>
      {spinner && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Header
        title={selectedType ? selectedType : "Select a Pokemon"}
        handleSelectType={(type) => handleSelectType(type)}
        types={props.types}
      />
      {props.pokemon && props.pdpON && (
        <Pdp
          imgindex={props.pokemon.id}
          weight={props.pokemon.weight}
          height={props.pokemon.height}
          abilities={props.pokemon.abilities ? props.pokemon.abilities : null}
          onClick={() => {
            closeCard();
          }}
          catched={() => {
            recordCatch();
          }}
        ></Pdp>
      )}
      {props.plpON && <Plp></Plp>}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types,
    names: state.names,
    pdpON: state.pdpON,
    plpON: state.plpON,
    pokemon: state.pokemon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTypes: (payload) => dispatch(addTypes(payload)),
    addNames: (payload) => dispatch(addNames(payload)),
    showPDP: (payload) => dispatch(showPDP(payload)),
    showPLP: (payload) => dispatch(showPLP(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MAINPAGE);
