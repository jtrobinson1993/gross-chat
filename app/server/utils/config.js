const config = require('../../../config.json');
const args = require('./command-line-args');

const database = config.database
									.replace('{{password}}', args.pw || args.password)
									.replace('{{username}}', args.name || args.username)

const obj = {
	debug: false,
	port: 3000,
	secret: 'secret_123',
	database: '',
	cert: '',
	key: ''
};

for(let key in config) obj[key] = config[key];
for(let key in args) obj[key] = args[key];

module.exports = obj;
