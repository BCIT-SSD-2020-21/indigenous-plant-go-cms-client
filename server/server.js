const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const jwt = require('./jwt')
const apikey = require('./apikey')
const makeUsersRouter = require('./routers/usersRouter')
const makeImagesRouter = require('./routers/imagesRouter')
const makeAudiosRouter = require('./routers/audiosRouter')
const makeVideosRouter = require('./routers/videosRouter')

const app = express()
app.use(express.json())

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database, authorize: jwt.authorize, generateToken: jwt.generateToken})
  app.use('/api/users', usersRouter)

  const imagesRouter = makeImagesRouter({database, verifyKey: apikey.verifyKey})
  app.use('/api/images', imagesRouter)

  const audiosRouter = makeAudiosRouter({database, verifyKey: apikey.verifyKey})
  app.use('/api/audios', audiosRouter)

  const videosRouter = makeVideosRouter({database, verifyKey: apikey.verifyKey})
  app.use('/api/videos', videosRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})