const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({})
    .catch(error => next(error))
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined && blog.url === undefined) {
    response.status(400, 'Bad Request').end()
    return
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }
  const result = await blog.save()
    .catch(error => next(error))

  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  // const blog = await Blog.findOne({ _id: id })

  if (request.body.likes !== undefined) {
    await Blog.findByIdAndUpdate(id, { likes: request.body.likes })
  }

  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.find({ _id: id })

  if (blog.length === 0) {
    response.status(404).end()
    return
  }

  await Blog.deleteOne({ _id: id })
    .catch(() => {
      response.status(500).end()
    })

  response.status(204).end()
})

module.exports = blogsRouter
