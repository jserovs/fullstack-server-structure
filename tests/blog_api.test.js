const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('ids are unique', async () => {
  const res = await api.get('/api/blogs');

  if (res.length > 0) {
    res[0].id.toBeDefined()
  }

})

afterAll(() => {
  mongoose.connection.close()
})