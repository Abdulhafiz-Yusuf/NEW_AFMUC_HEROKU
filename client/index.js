import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

//REDUX
import { Provider } from 'react-redux';
import Store from './appStore/Store'

//AUTH0
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";


ReactDOM.render(

  <Auth0ProviderWithHistory>
    <Provider store={Store} >
      <App />
    </Provider>
  </Auth0ProviderWithHistory>,
  document.getElementById("root"));