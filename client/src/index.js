import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import './index.css';




ReactDOM.render(
<AuthContextProvider>
<App />
</AuthContextProvider>, document.getElementById('root'));
