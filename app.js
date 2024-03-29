const express = require('express'); // import express module (simplifies routing/requests, among other things)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const app = express(); // create an instance of the express module (app is the conventional variable name used)
var bodyParser = require('body-parser');
const path = require('path');
// const services = require('./services/requests')

const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  //   //server static content
  //   //npm run build
  //app.use(express.static(path.join(__dirname, "./build")));
  app.use(express.static("./client/build")); // serve static files (css & js) from the 'build' directory...NB: this is also equivalent app.use(express.static('build')); 

}
else {
  app.use(express.static(path.join(__dirname, './client/build')));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 