import {
	ADD_SOMETHING,

} from "./actions";

const initialState = {
	something: [],

};

function appReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_SOMETHING:
			return {
				...state,
				something: action.data,
			};

		default:
			return state;
	}
}

export default appReducer;