const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const passportStrategy = require('../utils/passport-strategy');

const User = require('../models/User');
const Vote = require('../models/Vote');

const router = express.Router();

router.get('/', async (req, res, next) => {
	//res.json(await Vote.all().sort({date: -1}));
	res.json({});
});

router.post('/', async (req, res, next) => {
	// if(!req.body || !req.body.options || !req.body.title) res.json({success: false, msg: 'Invalid data'});
	//
	// const options = [];
	//
	// for(let title of req.body.options)
	// 	options.push({title, voters: []});
	//
	// const vote = new Vote.Model({
	// 	title: req.body.title,
	// 	options: options,
	// 	date: Date.now()
	// });
	//
	// res.json(await Vote.save(vote))

	res.json({});
});

router.post('/select', async (req, res, next) => {
	// const {vote, option, user} = req.body;
	//
	// res.json(await Vote.select({vote, option, user}));
	res.json({});
});

module.exports = router;
