const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

global.Promise = require('bluebird');

const config = require('./utils/config');
const passportStrategy = require('./utils/passport-strategy');

const userRoute = require('./routes/user');
const channelRoute = require('./routes/channel');

const messageSocket = require('./sockets/message');

const shell = require('./shell');

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
.use('/channel', channelRoute);

let server;

if(!config.ssl) {
	const http = require('http');
	server = http.createServer(app);
} else {
	const https = require('https');
	const fs = require('fs');
	const key = fs.readFileSync(config.ssl_key);
	const cert = fs.readFileSync(config.ssl_cert);
	server = https.createServer({key, cert}, app).listen(config.port, shell.start);
}

const io = require('socket.io')(server);

messageSocket(io);

server.listen(config.port, shell.start);
