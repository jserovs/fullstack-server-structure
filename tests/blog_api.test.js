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

test('post added to DB', async () => {

  const newBlogPost = {
    "title": "Blog title",
    "author": "Blog author",
    "url": "Blog url",
    "likes": 999
  }

  var res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogLengthBefore = isNaN(res.body.length) ? 0 : res.body.length;

  const postResult = await api.post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlogPost).expect(201)

  var res2 = await api.get('/api/blogs')
    .expect(200);

  expect(res2.body.length).toBe(blogLengthBefore + 1);
})

test('test like property missing', async () => {
  const newBlogPost = {
    "title": "test like property missing",
    "author": "Blog author",
    "url": "Blog url"
  }

  var res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogLengthBefore = isNaN(res.body.length) ? 0 : res.body.length;

  const postResult = await api.post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlogPost).expect(201)

  var res2 = await api.get('/api/blogs')
    .expect(200);

  expect(res2.body.length).toBe(blogLengthBefore + 1);

  expect(res2.body[blogLengthBefore].likes).toBe(0)

})

test('test bad request', async () => {
  const newBlogPost = {
    "author": "Blog author",
    "likes": 9
  }

  const response = await api.post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlogPost);

  expect(response.statusCode).toBe(400);

})

test('update request', async () => {
  const newBlogPost = {
    "title": "for update",
    "author": "Blog author",
    "url": "Blog url"
  }

  await api.post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlogPost).expect(201);
    
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogToUpdate = res.body.find(blog => blog.title === "for update");

  const id = blogToUpdate.id;

  const likesUpdate = {
    "likes": 100
  }

  const response = await api.put('/api/blogs/'+id)
    .set('Content-type', 'application/json')
    .send(likesUpdate);

  expect(response.statusCode).toBe(204);

  var updateResult = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // const afterUpdate = ;

  expect(updateResult.body.find(blog => blog.title === "for update").likes).toBe(100);


})

test('test delete request', async () => {
  const newBlogPost = {
    "title": "for delete",
    "author": "Blog author",
    "url": "Blog url"
  }

  await api.post('/api/blogs')
    .set('Content-type', 'application/json')
    .send(newBlogPost).expect(201);
    
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogToDelete = res.body.find(blog => blog.title === "for delete");

  const id = blogToDelete.id;

  await api.delete('/api/blogs/'+id)
    .set('Content-type', 'application/json')
    .send(newBlogPost).expect(204);

  var deleteResult = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(deleteResult.body.find(blog => blog.title === "for delete")).toBeUndefined();

})


afterAll(() => {
  mongoose.connection.close()
})

