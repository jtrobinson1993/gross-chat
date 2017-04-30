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
		await Vote.update({
			$and: [
				{_id: vote._id},
				{'options.voters': {$elemMatch: {$eq: user.id}}}
			]},
			{$pull: {'options.$.voters': user.id}}
		);
		return Vote.update({
			$and: [
				{_id: vote._id},
				{'options._id': mongoose.Types.ObjectId(option._id)}
			]},
			{$addToSet: {'options.$.voters': user.id}}
		);
	},
};
