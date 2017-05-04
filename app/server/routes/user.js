const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const passportStrategy = require('../utils/passport-strategy');

const User = require('../models/User');
const Vote = require('../models/Vote');

const router = express.Router();

function token(user) {
	return {
		user,
		token: `JWT ${jwt.sign(user, config.secret, {subject: String(user.id), expiresIn: 172800})}`
	};
}

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

	res.json({success: true, msg: 'profile'});

});

router.post('/authenticate', async (req, res, next) => {

	const user = await new User.Model({name: req.body.name}).fetch();

	if(!user) res.json({success: false, msg: 'User does not exist'});
	else if(!user.authenticate(req.body.password)) res.json({success: false, msg: 'Invalid credentials'});
	else res.json(token(user));

});

router.post('/register', async (req, res, next) => {
	
	const user = new User.Model({name: req.body.name});

	if(await user.fetch()) res.json({success: false, msg: 'Username already exists'});
	else res.json(token(await user.save('password', req.body.password)));

});

module.exports = router;
