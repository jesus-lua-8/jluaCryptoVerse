import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; //Used in order to use links and other things
import { Provider } from 'react-redux';

import App from './App';
import 'antd/dist/antd.css';

import store from './app/store';


/**
 * This makes all the routes of the app clickable and with a store provider to the app.
 */
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App /> 
        </Provider>
    </Router>,
    document.getElementById('root')
);