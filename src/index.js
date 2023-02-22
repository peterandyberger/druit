import React from 'react'
import {createRoot} from 'react-dom/client'
import App from '../src/App'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';  

store.subscribe(() => {
	console.log('changed state: ' + JSON.stringify(store.getState()))
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<App store={store} />
	</Provider>,
)