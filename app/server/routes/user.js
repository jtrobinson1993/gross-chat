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

router.post('/authenticate', async (req, res, next) => {
	const name = req.body.name;
	const password = req.body.password;

	const user = await User.findByName(name);
	if(!user) return res.json({success: false, msg: 'User does not exist'});

	const valid = await User.authenticate(user, password);
	if(!valid) return res.json({success: false, msg: 'Invalid credentials'});

	res.json({
		token: `JWT ${jwt.sign(user, config.secret, {subject: String(user._id), expiresIn: 172800})}`,
		user: {
			id: user._id,
			name: user.name
		}
	});

});

router.post('/register', async (req, res, next) => {
	const newUser = new User.Model({
		name: req.body.name,
		password: req.body.password
	});

	let user = await User.findByName(newUser.name);
	if(user) return res.json({success: false, msg: 'Username already exists'});

	user = await User.save(newUser);
	res.json({
		token: `JWT ${jwt.sign(user, config.secret, {subject: String(user._id), expiresIn: 172800})}`,
		user: {
			id: user._id,
			name: user.name
		}
	});

});

module.exports = router;
