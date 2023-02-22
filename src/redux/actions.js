export const ADD_TYPES = "ADD_TYPES";
export const ADD_NAMES = "ADD_NAMES";
export const SHOW_PDP = "SHOW_PDP";
export const SHOW_PLP = "SHOW_PLP";
export const STORE_POKEMON = "STORE_POKEMON";
export const STORE_FILTERED_NAMES = "STORE_FILTERED_NAMES";

export function addTypes(data) {
  return { type: ADD_TYPES, data: data };
}

export function addNames(data) {
  return { type: ADD_NAMES, data: data };
}

export function showPDP(data) {
  return { type: SHOW_PDP, data: data };
}

export function showPLP(data) {
    return { type: SHOW_PLP, data: data };
  }

export function storePokemon(data) {
    return { type: STORE_POKEMON, data: data };
  }

  export function storeFilteredNames(data) {
    return { type: STORE_FILTERED_NAMES, data: data };
  }  
