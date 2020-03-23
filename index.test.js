const supertest = require('supertest');
const server = require('./api/server');
const db = require('./database/dbConfig');

beforeEach(async () => {
	await db.seed.run();
});

afterAll(async () => {
	await db.destroy();
});

test('see if user is registered', async () => {
	const res = await supertest(server).post('/api/auth/register').send({ username: 'Manboy', password: 'hello' });
	expect(res.statusCode).toBe(201);
	expect(res.type).toBe('application/json');
});

test('see if username is taken', async () => {
	const res = await supertest(server).post('/api/auth/register').send({ username: 'Terminator', password: '2029' });
	expect(res.statusCode).toBe(409);
});

test('see if login failed', async () => {
	const res = await supertest(server).post('/api/auth/login').send({ username: 'Terminator', password: '2029' });
	expect(res.statusCode).toBe(401);
});
