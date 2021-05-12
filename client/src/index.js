import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './index.css';


// Context resultProvider
//import { ResultProvider } from './AppStore/contextAPI/ResultContext'


//REDUX
// import { Provider } from 'react-redux';
// import Store from './AppStore/Redux/Store';


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
// 
var destination = document.getElementById('root');
// 
ReactDOM.render(
  // <PouchDB name="dbname">
  //   <Suspense fallback="loading...">
  // <Provider store={Store} >
  <App />
  // </Provider>
  //   </Suspense>
  // </PouchDB>
  , destination);


// import React from 'react';
// import ReactDOM from 'react-dom';
// //import App from './App';
// import './index.css';

// ReactDOM.render(<h1>THis is me</h1>, document.getElementById('root'))
