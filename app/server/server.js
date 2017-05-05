const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const shell = require('./shell');

const config = require('./utils/config');
const passportStrategy = require('./utils/passport-strategy');

const userRoute = require('./routes/user');
const voteRoute = require('./routes/vote');

global.Promise = require('bluebird');

passport.use(passportStrategy);

const app = express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({
	extended: true
}))
.use(passport.initialize())
.use(passport.session())
.use('/', express.static(
	path.join(__dirname, '../client/build')
))
.use('/user', userRoute)
.use('/vote', voteRoute);

if(!config.ssl) app.listen(config.port, shell.start);
else {

	const https = require('https');
	const fs = require('fs');

	const options = {
		key: fs.readFileSync(config.ssl_key),
		cert: fs.readFileSync(config.ssl_cert)
	};

	https.createServer(options, app).listen(config.port, shell.start);

}
