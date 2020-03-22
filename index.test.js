const supertest = require('supertest')
const server = require('./api/server')
const db = require('./database/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
  })



test('see if user is registered', async () => {
    const res = await supertest(server)
    .post('/api/auth/register').send({username: "Manboy", password: "hello"})
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.name).toBe("Manboy")
})

// test('see if username is taken' , async () => {
//     const res = await supertest(server)
//     .post('auth/register')
//     .send({username: "Terminator", password: "2029"})
//     expect(res.type).toBe('application/json')
//     expect(res.statusCode).toBe(409)
// })



// test('see if login is successful', async () => {
//     const res = await supertest(server)
//     .post('/api/auth/login')
//     .send({username: 'Terminator', password: "2029"})
//     expect(res.status).toBe(200)
// })


// test('see if login failed', async () => {
//     const res = await supertest(server)
//     .post('/auth/login')
//     .send({username: "Terminator", password: 2020})
//     expect(res.status).toBe(401)
//     expect(res.type).toBe('application/json')
// })
