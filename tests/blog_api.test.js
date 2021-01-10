const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Blog test set', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlogPost = new Blog({
      title: 'initial Blog title',
      author: 'initial Blog author',
      url: 'initial Blog url',
      likes: 0
    })

    await newBlogPost.save()
  })

  test('ids are unique', async () => {
    const res = await api.get('/api/blogs')

    if (res.length > 0) {
      res[0].id.toBeDefined()
    }
  })

  test('add', async () => {
    const newBlogPost = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'Blog url',
      likes: 999
    }

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogLengthBefore = isNaN(res.body.length) ? 0 : res.body.length

    await api.post('/api/blogs')
      .set('Content-type', 'application/json')
      .send(newBlogPost).expect(201)

    const res2 = await api.get('/api/blogs')
      .expect(200)

    expect(res2.body.length).toBe(blogLengthBefore + 1)
  })

  test('like property empty, set to 0', async () => {
    const newBlogPost = {
      title: 'test like property missing',
      author: 'Blog author',
      url: 'Blog url'
    }

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogLengthBefore = isNaN(res.body.length) ? 0 : res.body.length

    await api.post('/api/blogs')
      .set('Content-type', 'application/json')
      .send(newBlogPost).expect(201)

    const res2 = await api.get('/api/blogs')
      .expect(200)

    expect(res2.body.length).toBe(blogLengthBefore + 1)

    expect(res2.body[blogLengthBefore].likes).toBe(0)
  })

  test('bad request', async () => {
    const newBlogPost = {
      author: 'Blog author',
      likes: 9
    }

    const response = await api.post('/api/blogs')
      .set('Content-type', 'application/json')
      .send(newBlogPost)

    expect(response.statusCode).toBe(400)
  })

  test('update', async () => {
    const newBlogPost = {
      title: 'for update',
      author: 'Blog author',
      url: 'Blog url'
    }

    await api.post('/api/blogs')
      .set('Content-type', 'application/json')
      .send(newBlogPost).expect(201)

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToUpdate = res.body.find(blog => blog.title === 'for update')

    const id = blogToUpdate.id

    const likesUpdate = {
      likes: 100
    }

    const response = await api.put('/api/blogs/' + id)
      .set('Content-type', 'application/json')
      .send(likesUpdate)

    expect(response.statusCode).toBe(204)

    const updateResult = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // const afterUpdate = ;

    expect(updateResult.body.find(blog => blog.title === 'for update').likes).toBe(100)
  })

  test('delete', async () => {
    const newBlogPost = {
      title: 'for delete',
      author: 'Blog author',
      url: 'Blog url'
    }

    await api.post('/api/blogs')
      .set('Content-type', 'application/json')
      .send(newBlogPost).expect(201)

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = res.body.find(blog => blog.title === 'for delete')

    const id = blogToDelete.id

    await api.delete('/api/blogs/' + id)
      .set('Content-type', 'application/json')
      .send(newBlogPost).expect(204)

    const deleteResult = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(deleteResult.body.find(blog => blog.title === 'for delete')).toBeUndefined()
  })

  test('blogs are json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
