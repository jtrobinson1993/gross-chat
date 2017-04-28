const config = require('../../../config.json');
const args = require('./command-line-args');

const defaults = {
	debug: true,
	port: 3000,
	secret: 'secret_123',
	database: '',
	cert: '',
	key: '',
	username: '',
	password: ''
};

for(let key in config) defaults[key] = config[key];
for(let key in args) defaults[key] = args[key];

defaults.database = defaults.database
								.replace('{{password}}', defaults.pw || defaults.password)
								.replace('{{username}}', defaults.name || defaults.username);

module.exports = defaults;
