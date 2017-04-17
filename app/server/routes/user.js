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

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({success: true, msg: 'profile'});
});

router.post('/authenticate', (req, res, next) => {
	const name = req.body.name;
	const password = req.body.password;
	User.findByName(name, (err, user) => {
		if(err || !user) res.json({success: false, msg: 'User does not exist'});
		else User.authenticate(user, password, (err, success) => {
			if(err) res.json({success: false, msg: err});
			else if(!success) res.json({success: false, msg: 'Invalid credentials'});
			else res.json({
				token: `JWT ${jwt.sign(user, config.SECRET, {subject: String(user._id), expiresIn: 172800})}`,
				user: {
					id: user._id,
					name: user.name
				}
			});
		});
	});
});

router.post('/register', (req, res, next) => {
	const newUser = new User.Model({
		name: req.body.name,
		password: req.body.password
	});

	User.findByName(newUser.name, (err, user) => {
		if(!user) User.save(newUser, (err, user) => {
			res.json({
				token: `JWT ${jwt.sign(user, config.SECRET, {subject: String(user._id), expiresIn: 172800})}`,
				user: {
					id: user._id,
					name: user.name
				}
			});
		});
		else
			res.json({success: false, msg: 'Username already exists'});
	});

});

module.exports = router;
