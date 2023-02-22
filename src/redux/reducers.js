import {
  ADD_TYPES,
  ADD_NAMES,
  SHOW_PDP,
  SHOW_PLP,
  STORE_POKEMON,
} from "./actions";

const initialState = {
  types: [],
  names: [],
  pdpON: false,
  plpON: false,
  pokemon: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TYPES:
      return {
        ...state,
        types: action.data,
      };
    case SHOW_PDP:
      return {
        ...state,
        pdpON: action.data,
      };
    case SHOW_PLP:
      return {
        ...state,
        plpON: action.data,
      };
    case ADD_NAMES:
      return {
        ...state,
        names: action.data,
      };
    case STORE_POKEMON:
      return {
        ...state,
        pokemon: action.data,
      };

    default:
      return state;
  }
}

export default appReducer;
