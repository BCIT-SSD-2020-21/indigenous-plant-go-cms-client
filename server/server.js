const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const jwt = require('./jwt')
const apikey = require('./apikey')
const multer = require('multer')
const path = require('path')
const s3 = require('./s3')
const makeUsersRouter = require('./routers/usersRouter')
const makeImagesRouter = require('./routers/imagesRouter')
const makeAudiosRouter = require('./routers/audiosRouter')
const makeVideosRouter = require('./routers/videosRouter')

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage: storage})

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database, authorize: jwt.authorize, generateToken: jwt.generateToken})
  app.use('/api/users', usersRouter)

  const imagesRouter = makeImagesRouter({database, verifyKey: apikey.verifyKey, upload: upload, uploadFile: s3.uploadFile})
  app.use('/api/images', imagesRouter)

  const audiosRouter = makeAudiosRouter({database, verifyKey: apikey.verifyKey, upload: upload, uploadFile: s3.uploadFile})
  app.use('/api/audios', audiosRouter)

  const videosRouter = makeVideosRouter({database, verifyKey: apikey.verifyKey, upload: upload, uploadFile: s3.uploadFile})
  app.use('/api/videos', videosRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})