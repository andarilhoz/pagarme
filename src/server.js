'use strict';

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

app.use(bodyParser.json());

module.exports = app;