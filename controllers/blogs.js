const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .catch(error => next(error))
    response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
        .catch(error => next(error))

    response.status(201).json(result)
})


module.exports = blogsRouter