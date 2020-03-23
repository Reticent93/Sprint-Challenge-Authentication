exports.seed = async function(knex) {
	await knex('users').truncate();
	await knex('users').insert([
		{ username: 'Terminator', password: '2029' },
		{ username: 'Oldlady', password: 'abc123' },
		{ username: 'Oldman', password: 'abc012' }
	]);
};
