const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user')
    .catch(error => next(error))
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const token = getTokenFrom(request)
  const decodedToken = await jwt.verify(token, process.env.SECRET, (error, result) => {
    if (error) {
      next(error)
    } else {
      console.log(result)
      return result
    }
  })

  if (decodedToken === undefined || !decodedToken.id) {
    return
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  })

  console.log('user.toJSON' + user.toJSON())

  if (blog.title === undefined && blog.url === undefined) {
    response.status(400, 'Bad Request').end()
    return
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }
  await user.blogs.push(blog)
  await user.save()
  const result = await blog.save()

  return response.status(201).json(result)
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
