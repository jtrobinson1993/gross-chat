const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const socket = require('socket.io');

global.Promise = require('bluebird');

const shell = require('./shell');

const config = require('./utils/config');
const passportStrategy = require('./utils/passport-strategy');

const userRoute = require('./routes/user');

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
.use('/user', userRoute);

const server;

if(!config.ssl) {

	const http = require('http');
	server = http.createServer(app);

} else {

	const https = require('https');
	const fs = require('fs');

	const options = {
		key: fs.readFileSync(config.ssl_key),
		cert: fs.readFileSync(config.ssl_cert)
	};

	server = https.createServer(options, app);

	https.createServer(options, app).listen(config.port, shell.start);

}

const io = socket(server);

server.listen(config.port, shell.start);
