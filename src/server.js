'use strict';

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      pokemons = require('./routes/pokemons');

app.use(bodyParser.json());

app.use('/pokemon',pokemons)

module.exports = app;