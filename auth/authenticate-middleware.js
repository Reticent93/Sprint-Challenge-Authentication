/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

module.exports = async (req, res, next) => {
	try {
		const { username, password } = req.headers;
		if (!username || !password) {
			res.status(401).json({ you: 'shall not pass!' });
		}
		const user = await Users.findBy({ username }).first();
		const passValid = await bcrypt.compare(password, user.password);
		if (!user || !passValid) {
			res.status(401).json({ you: 'shall not pass!' });
		}
	} catch (err) {
		next(err);
	}
};
