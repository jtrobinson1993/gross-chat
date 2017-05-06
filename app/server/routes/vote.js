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

const _ = require('lodash');

const router = express.Router();

router.get('/', async (req, res, next) => {
	let topics = await new Topic.Collection().orderBy('id','DESC').fetch();
	topics = await topics.load(['options', 'options.voters']);
	res.json(topics.toJSON());
});

router.post('/', async (req, res, next) => {

	const {title, options} = req.body;

	let topic = await new Topic.Model({title}).save();
	await Promise.map(options, title => topic.related('options').create(new Option.Model({title})));
	topic = await topic.load(['options', 'options.voters']);

	res.json(topic.toJSON());

});

router.post('/:id/select', async (req, res, next) => {

	// const {vote, option, user} = req.body;
	//
	// res.json(await Vote.select({vote, option, user}));
	res.json({});

});

module.exports = router;
