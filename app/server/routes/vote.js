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

module.exports = router;
