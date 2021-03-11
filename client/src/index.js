import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

//REDUX
import { Provider } from 'react-redux';
import Store from './appStore/Store'

//AUTH0
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(

  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={process.env.REACT_APP_REDUIRECT_URI}
    //redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUDIENCE}
  >
    <Provider store={Store} >
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById("root"));