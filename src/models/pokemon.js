'use strict';

const db = require('./db');

const Pokemon = db.sequelize.define('pokemon', {
	name: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: db.Sequelize.INTEGER,
		allowNull: false
	},
	stock: {
		type: db.Sequelize.INTEGER,
		allowNull: true,
		defaultValue: 1
	}
});

Pokemon.sync({force: true}).then(() => {
	console.log('Model is ready!');
});

module.exports = Pokemon;