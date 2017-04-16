const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = {
	Schema: UserSchema,
	Model: User,
	findById: (id, callback) => User.findById(id, callback),
	findByName: (name, callback) => User.findOne({name}, callback),
	save: (user, callback) => {
					bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
						if(err) throw err;
						user.password = hash;
						user.save(callback);
					}));
				},
	authenticate: (password, hash, callback) => bcrypt.compare(password, hash, callback)
};
