// import './polyfills/polyfills';
/* Map() polyfill for IE */
import 'core-js/es/map';
import 'core-js/es/set';
import * as React from 'react';
/* Set() polyfill for IE */
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import allReducers from 'Reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';

const store = createStore(allReducers, applyMiddleware(thunk));

window['AppState'] = store;

const Application = () => (
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>

)

export default Application;
