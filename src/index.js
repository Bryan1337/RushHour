
/* Map() polyfill for IE */
import 'core-js/es/map';
/* Set() polyfill for IE */
import 'core-js/es/set';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./components/app/Application";

const rootElement = document.getElementById('root');

ReactDOM.render(<Application />, rootElement);