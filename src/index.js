import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './components/App/App';
import { backEndTest } from './backEndTest';
import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()


ReactDOM.render(
    <Router history={history}>
        <App history={history}/>
    </Router>,
    document.getElementById('root'));

// // example of using
// backEndTest();
