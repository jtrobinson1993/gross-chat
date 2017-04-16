const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('./config');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.SECRET
};

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
	console.log(jwt_payload);
	User.findById(jwt_payload.sub, (err, user) => {
		if(err) return done(err, false);
		else return done(null, user);
	});
});
