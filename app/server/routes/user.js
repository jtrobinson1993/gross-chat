const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const passportStrategy = require('../utils/passport-strategy');

const User = require('../models/User');

const router = express.Router();

console.log(passport);

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({success: true, msg: 'profile'});
});

router.post('/authenticate', (req, res, next) => {
	const name = req.body.name;
	const password = req.body.password;
	User.findByName(name, (err, user) => {
		if(err || !user) res.json({success: false, msg: 'User does not exist'});
		else User.authenticate(password, user.password, (err, success) => {
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
	const user = new User.Model({
		name: req.body.name,
		password: req.body.password
	});
	User.save(user, (err, user) => {
			res.json({success: !err, msg: err || 'User created'});
	});
});

module.exports = router;
