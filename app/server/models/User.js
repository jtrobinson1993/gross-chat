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
	save: async (user, callback) => {
					user.password = await bcrypt.hash(user.password, 10);
					return user.save(callback);
				},
	authenticate: (user, password, callback) => bcrypt.compare(password, user.password, callback)
};
