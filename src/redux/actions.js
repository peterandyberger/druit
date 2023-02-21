export const ADD_SOMETHING = "ADD_SOMETHING";

export function addSomething(data) {
	return {type: ADD_SOMETHING, data: data};
}