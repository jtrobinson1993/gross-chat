const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./utils/config');
const passportStrategy = require('./utils/passport-strategy');

const userRoute = require('./routes/user');
const voteRoute = require('./routes/vote');

mongoose.connect(config.DATABASE_URL);
passport.use(passportStrategy);

express()
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
.use('/vote', voteRoute)
.listen(config.PORT, () => console.log(`Running on port ${config.PORT}`));
