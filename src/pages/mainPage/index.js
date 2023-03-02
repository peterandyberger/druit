import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import {
  addTypes,
  addNames,
  showPDP,
  showPLP,
  storeFilteredNames,
} from "../../redux/actions";
import { connect } from "react-redux";
import Plp from "../../components/plp";
import pokemonApi from "../../api/index";
import Pdp from "../../components/pdp";

const MAINPAGE = (props) => {
  const [selectedType, setSelectedType] = useState();
  const [spinner, setSpinner] = useState(true);
  const [catched, setCatched] = useState();
  const [filteredList, setFilteredList] = useState();
  const [greenID, setGreenID] = useState(false)

  const handleSelectType = (type) => {
    setSelectedType(type);
    createList(type);
    props.showPDP(false);
  };

  useEffect(() => {
    const getTypes = async () => {
      const response = await pokemonApi.get("type", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.addTypes(response.data.results);
    };
  
    getTypes();
    setSpinner(false);
  }, []);
  

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItem")) || [];
    setCatched(items);

    const handleStorageChange = () => {
      const updatedItems =
        JSON.parse(localStorage.getItem("selectedItem")) || [];
      setCatched(updatedItems);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
    !items?.includes(props.pokemon.id) && items.push(props.pokemon.id);
    localStorage.setItem("selectedItem", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  };

  const removeCatch = () => {
    var items = JSON.parse(localStorage.getItem("selectedItem")) || [];
    const index = items.indexOf(props.pokemon.id);
    items.splice(index, 1);
    localStorage.setItem("selectedItem", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  };

  const checkCatched = (id) => {
    return catched?.includes(parseInt(id));
  };

  const filterNames = (e) => {
      props.names &&
      props.storeFilteredNames(
          props.names?.pokemon?.filter((name) => {
            return name.pokemon.name.toLowerCase().includes(e.target.value.toLowerCase());
          })
      );
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
        title={selectedType ? selectedType : "Select a Pokemon type"}
        handleSelectType={(type) => handleSelectType(type)}
        types={props.types}
        onChange={(e) => filterNames(e)}
        onChangeCheckBox={()=> {setGreenID(!greenID)}}
      />
      {props.pokemon && props.pdpON && catched && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Pdp
            button_className={
              checkCatched(props.pokemon.id)
                ? "btn btn-success"
                : "btn btn-danger"
            }
            button_text={checkCatched(props.pokemon.id) ? "Release!" : "Catch!"}
            imgindex={props.pokemon.id}
            name={props.pokemon.name}
            weight={props.pokemon.weight}
            height={props.pokemon.height}
            abilities={props.pokemon.abilities ? props.pokemon.abilities : null}
            onClick={() => {
              closeCard();
            }}
            catched={() => {
              checkCatched(props.pokemon.id) ? removeCatch() : recordCatch();
            }}
          ></Pdp>
        </div>
      )}
      {props.plpON && <Plp id={greenID.toString()} className={ greenID ? 'noShow' : ''}></Plp>}
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
    filtered_names: state.filtered_names,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTypes: (payload) => dispatch(addTypes(payload)),
    addNames: (payload) => dispatch(addNames(payload)),
    showPDP: (payload) => dispatch(showPDP(payload)),
    showPLP: (payload) => dispatch(showPLP(payload)),
    storeFilteredNames: (payload) => dispatch(storeFilteredNames(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MAINPAGE);
