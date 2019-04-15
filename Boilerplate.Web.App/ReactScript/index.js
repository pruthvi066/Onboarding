import React, { Component } from 'react';
import { render } from 'react-dom';

import App from './Component/App.jsx';
//import 'bootstrap/dist/js/bootstrap.js';

import 'semantic-ui-css/semantic.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './style/myStyle.css';
//import {AddCustomer} from './Component/AddCustomer.jsx';
function renderApp() {
    render(
        <App />,
        document.getElementById("root")
    );
}
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept();
    //module.hot.accept('./routes', () => { const NextApp = require('./routes').default; renderApp(); });
}