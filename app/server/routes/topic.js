const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const shell = require('../shell');
const response = require('../utils/response');
const config = require('../utils/config');
const passportStrategy = require('../utils/passport-strategy');

const User = require('../models/User');
const Vote = require('../models/Vote');
const Option = require('../models/Option');
const Topic = require('../models/Topic');

const router = express.Router();

router.get('/', async (req, res, next) => {

	let json;

	try {
		let topics = await new Topic.Collection()
			.orderBy('id','DESC')
			.fetch({
				withRelated: ['options', {'options.voters': qb=>qb.column('users.id')}]
			});

		json = topics.toJSON();
	} catch (e) {
		shell.trace(e);
		json = response.failure('Cannot retrieve topic list');
	}

	res.json(json);

});

router.get('/:id', async (req, res, next) => {

	let json;

	try {
		let topic = await new Topic.Model({id: req.params.id})
			.fetch({
				withRelated: ['options', {'options.voters': qb=>qb.column('users.id')}]
			});

		json = topic.toJSON();
	} catch (e) {
		shell.trace(e);
		json = response.failure('Cannot retrieve topic');
	}

	res.json(reponse);

});

router.post('/', async (req, res, next) => {

	const {title, options} = req.body;
	let json;

	try {
		let topic = await new Topic.Model({title}).save();
		await Promise.map(options, title => topic.related('options').create(new Option.Model({title})));
		topic = await topic.load(['options', 'options.voters']);

		json = topic.toJSON();
	} catch (e) {
		shell.trace(e);
		json = response.failure('Topic creation failed');
	}

	res.json(json);

});

router.post('/:id/select', async (req, res, next) => {

	const topic_id = req.params.id;
	const {option: {id: option_id}, user: {id: user_id}} = req.body;
	let json;

	try {
		await new Vote.Model().where({topic_id, user_id}).destroy();
		const vote = await new Vote.Model({topic_id, user_id, option_id}).save();

		json = vote.toJSON();
	} catch (e) {
		shell.trace(e);
		json = response.failure('Vote cast failed');
	}

	res.json(json);

});

module.exports = router;
