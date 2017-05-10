'use strict';

const Sequelize = require('sequelize'),
      config = require('../../config/config');


const sequelize = new Sequelize(config.database.name, null, null, {
	dialect: config.database.dialect
});


module.exports = {sequelize,Sequelize};