import axios from 'axios';

export default axios.create({
	baseURL: 'https://pokeapi.co/',
	headers: {
		'Content-Type': 'application/json',
	},
});