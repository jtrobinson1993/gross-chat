const mongoose = require('mongoose');

const VoteSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: Number,
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
	all: (callback) => Vote.find({}, callback),
	save: (vote, callback) => vote.save(callback),

	select: async ({vote, user, option}) => {
		console.log(vote._id);
		await Vote.update({_id: vote._id}, {$pull: {options: {voters: {$eq: user._id}}}});
		return Vote.update({_id: vote._id}, {$addToSet: {options: {voters: user._id}}})
	},
};
