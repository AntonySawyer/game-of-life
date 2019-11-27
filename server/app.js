const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// server.js
const port = 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, () => {
  console.log('We are live on ' + port);
});

mongoose.connect('mongodb://localhost/game_of_life')
  .then(() => console.log('mongodb: connection successful'))
  .catch((err) => console.error(err));

const gameSave = require('./save.model.js');

app.post('/save', (req, res) => {
  gameSave.create({
    name: req.body.name,
    field: req.body.field
  })
});

app.post('/load', (req, res) => {
  gameSave.find({}, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(data);
    }
  })
});