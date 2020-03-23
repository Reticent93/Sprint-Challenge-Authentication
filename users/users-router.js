const express = require('express');
const Users = require('./users-model');
const restrict = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/', restrict(), restrictRole(), async (req, res, next) => {
	try {
		res.json(await Users.find());
	} catch (err) {
		next(err);
	}
});

module.exports = router;
