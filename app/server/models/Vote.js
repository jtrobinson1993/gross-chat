const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	options: {
		type: [{
			title: {
				type: String,
				required: true
			},
			voters: [mongoose.Schema.Types.ObjectId]
		}]
	}
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = {
	Schema: VoteSchema,
	Model: Vote,
	findById: (id, callback) => Vote.findById(id, callback),
	all: (callback) => Vote.find({}, callback)

};
