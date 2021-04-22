const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const jwt = require('./jwt')
const makeUsersRouter = require('./routers/usersRouter')
const makeTagsRouter = require('./routers/tagsRouter')
const makeCategoriesRouter = require('./routers/categoriesRouter')
const makeLocationsRouter = require('./routers/locationsRouter')
const makeRevisionsRouter = require('./routers/revisionsRouter')

const app = express()
app.use(express.json())

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database, authorize: jwt.authorize, generateToken: jwt.generateToken})
  app.use('/api/users', usersRouter)
  const tagsRouter = makeTagsRouter({database})
  app.use('/api/tags', tagsRouter)
  const categoriesRouter = makeCategoriesRouter({database})
  app.use('/api/categories', categoriesRouter)
  const locationsRouter = makeLocationsRouter({database})
  app.use('/api/locations', locationsRouter)
  const revisionsRouter = makeRevisionsRouter({database})
  app.use('/api/revisions', revisionsRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})