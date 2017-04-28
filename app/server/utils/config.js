const config = require('../../../config.json');
const args = require('./command-line-args');

const obj = {
	debug: false,
	port: 3000,
	secret: 'secret_123',
	database: '',
	cert: '',
	key: '',
	username: '',
	password: ''
};

for(let key in config) obj[key] = config[key];
for(let key in args) obj[key] = args[key];

obj.database = obj.database
								.replace('{{password}}', obj.pw || obj.password)
								.replace('{{username}}', obj.name || obj.username);

module.exports = obj;
