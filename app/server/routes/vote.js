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

const _ = require('lodash');

const router = express.Router();

router.get('/:id', async (req, res, next) => {

	const id = req.id ? {id: req.id} : {};
	res.json((await new Vote.Model(id).fetch({withRelated: 'options'})).toJSON());

});

router.post('/', async (req, res, next) => {

	const {title, options} = req.body;

	const topic = await new Topic.Model({title}).save();

	await Promise.map(options, (option) => {
		topic.related('options').create(new Option.Model({title: option}));
	});

	res.json(topic.toJSON());

});

router.post('/select', async (req, res, next) => {

	// const {vote, option, user} = req.body;
	//
	// res.json(await Vote.select({vote, option, user}));
	res.json({});

});

module.exports = router;
