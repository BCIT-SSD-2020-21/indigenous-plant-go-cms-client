const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const makeUsersRouter = require('./routers/usersRouter')

const app = express()
app.use(express.json())

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database})
  app.use('/api/users', usersRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})