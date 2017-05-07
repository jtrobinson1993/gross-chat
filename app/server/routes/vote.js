const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const passportStrategy = require('../utils/passport-strategy');

const User = require('../models/User');
const Vote = require('../models/Vote');
const Option = require('../models/Option');
const Topic = require('../models/Topic');

const router = express.Router();

router.get('/', async (req, res, next) => {

	let response;

	try {
		let topics = await new Topic.Collection()
			.orderBy('id','DESC')
			.fetch({
				withRelated: ['options', {'options.voters': qb=>qb.column('users.id')}]
			});

		response = topics.toJSON();
	} catch (e) {
		config.trace(e);
		response = {success: false, msg: 'Cannot retrieve topic list'};
	}

	res.json(response);

});

router.get('/:id', async (req, res, next) => {

	let response;

	try {
		let topic = await new Topic.Model({id: req.params.id})
			.fetch({
				withRelated: ['options', {'options.voters': qb=>qb.column('users.id')}]
			});

		response = topic.toJSON();
	} catch (e) {
		config.trace(e);
		response = {success: false, msg: 'Cannot retrieve topic'};
	}

	res.json(reponse);

});

router.post('/', async (req, res, next) => {

	const {title, options} = req.body;
	let response;

	try {
		let topic = await new Topic.Model({title}).save();
		await Promise.map(options, title => topic.related('options').create(new Option.Model({title})));
		topic = await topic.load(['options', 'options.voters']);

		response = topic.toJSON();
	} catch (e) {
		config.trace(e);
		response = {success: false, msg: 'Topic creation failed'};
	}

	res.json(response);

});

router.post('/:id/select', async (req, res, next) => {

	const id = req.params.id;
	const {option, user} = req.body;
	let response;

	try {
		await new Vote.Model().where({
			topic_id: id,
			user_id: user.id
		}).destroy();
		const vote = await new Vote.Model({user_id: user.id, option_id: option.id, topic_id: id}).save();

		response = vote.toJSON();
	} catch (e) {
		config.trace(e);
		response = {success: false, msg: 'Vote cast failed'};
	}

	res.json(response);

});

module.exports = router;
