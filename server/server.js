const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const jwt = require('./jwt')
const makeUsersRouter = require('./routers/usersRouter')
const makeTagsRouter = require('./routers/tagsRouter')

const app = express()
app.use(express.json())

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database, authorize: jwt.authorize, generateToken: jwt.generateToken})
  app.use('/api/users', usersRouter)
  const tagsRouter = makeTagsRouter({database})
  app.use('/api/tags', tagsRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})