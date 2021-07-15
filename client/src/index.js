import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

//REDUX
// import { Provider } from 'react-redux';
import ContextProvider from './AppStore/globalStore'

var destination = document.getElementById('root');

ReactDOM.render(
  <ContextProvider >
    <App />
  </ContextProvider>, destination
);