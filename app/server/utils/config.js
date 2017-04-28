const config = require('../../../config.json');
const args = require('./command-line-args');

const database = config.database
									.replace('{{password}}', args.pw || args.password)
									.replace('{{username}}', args.name || args.username)

module.exports = {
	DEBUG: args.debug || config.debug,
	PORT: args.port || config.port || 3000,
	SECRET: args.secret || config.secret || 'secret_123',
	DATABASE_URL: database
};
