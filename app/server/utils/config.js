const config = require('../../../config.json');
const args = require('./command-line-args');

const defaults = {
  "debug": true,
  "port": 3000,
	"secret": "abc@123",
  "ssl": false,
  "ssl_key": "",
  "ssl_cert": "",
  "database_host": "localhost",
  "database_user": "root",
  "database_password": "",
  "database_name": ""
};

for(let key in config) defaults[key] = config[key];
for(let key in args) defaults[key] = args[key];

defaults.trace = (...strs) => defaults.debug && strs && strs.forEach(console.log);
defaults.failure = (msg) => { return {success: false, msg}};

module.exports = defaults;
