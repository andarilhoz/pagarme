'use strict';

const app = require('./src/server'),
	  config = require('./config/config');

app.listen(config.server.port, () => {
	console.log(`Listening on http://localhost:${config.server.port}`);
});