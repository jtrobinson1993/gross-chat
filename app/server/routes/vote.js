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

router.get('/list', (req, res, next) => {
	Vote.all((err, docs) => {
		res.json(docs);
	});
});

router.post('/choose', (req, res, next) => {

});

router.post('/create', (req, res, next) => {
	if(!req.body || !req.body.options || !req.body.title) res.json({success: false, msg: 'Invalid data'});

	const options = [];

	for(let title of req.body.options)
		options.push({title, voters: []});

	const vote = new Vote.Model({
		title: req.body.title,
		options: options
	});

	vote.save((err, doc) => {
		if(err) res.json({success: false, msg: err});
		else res.json(doc);
	});

});

module.exports = router;
