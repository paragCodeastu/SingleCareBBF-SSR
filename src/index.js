import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from'react-router-dom'
import App from './App';

const container = document.getElementById('root');

const root = ReactDOM.hydrateRoot(container,<App/>);