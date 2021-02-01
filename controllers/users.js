const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  })
  response.json(users.map((user) => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (request.body.password === undefined || request.body.password.length < 4) {
    return response.status(400).json({
      error: 'password length must be more than 3 symbols'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,

    passwordHash
  })

  const savedUser = await user.save().catch(error => {
    console.log('ERROR:' + error)
    next(error)
  })

  if (savedUser !== undefined) {
    response.json(savedUser)
  }
})

module.exports = usersRouter
