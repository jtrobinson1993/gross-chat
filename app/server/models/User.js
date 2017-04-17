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
	},
	votes: [{
			vote: mongoose.Schema.Types.ObjectId,
			option: mongoose.Schema.Types.ObjectId
	}]
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
	authenticate: (user, password, callback) => bcrypt.compare(password, user.password, callback)
};
