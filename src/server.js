'use strict';

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      pokemons = require('./routes/pokemons');

app.use(bodyParser.json());

app.use('/pokemons',pokemons)

module.exports = app;