const args = require('./command-line-args');

module.exports = {
	PORT: 8001,
	SECRET: 'secret_123',
	DATABASE_URL: `mongodb://test:${args.pw}@ds155160.mlab.com:55160/josh3141`
};
