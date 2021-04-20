const express = require('express')
const mongoDatabase = require('./mongoDatabase')
const jwt = require('./jwt')
const apikey = require('./apikey')
const multer = require('multer')
const multerS3 = require('multer-s3')
const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()
const makeUsersRouter = require('./routers/usersRouter')
const makeImagesRouter = require('./routers/imagesRouter')
const makeAudiosRouter = require('./routers/audiosRouter')
const makeVideosRouter = require('./routers/videosRouter')

const app = express()
app.use(express.json())

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

const storage = multerS3({
  s3: s3,
  bucket: bucketName,
  metadata: function(req, file, cb) {
    cb(null, {fieldName: file.fieldname})
  },
  key: function(req, file, cb) {
    cb(null, `${Date.now().toString()}${file.originalname}`)
  }
});
const upload = multer({storage: storage})

mongoDatabase().then((database) => {
  const usersRouter = makeUsersRouter({database, authorize: jwt.authorize, generateToken: jwt.generateToken})
  app.use('/api/users', usersRouter)

  const imagesRouter = makeImagesRouter({database, verifyKey: apikey.verifyKey, upload: upload, s3: s3})
  app.use('/api/images', imagesRouter)

  const audiosRouter = makeAudiosRouter({database, verifyKey: apikey.verifyKey, upload: upload, s3: s3})
  app.use('/api/audios', audiosRouter)

  const videosRouter = makeVideosRouter({database, verifyKey: apikey.verifyKey, upload: upload, s3: s3})
  app.use('/api/videos', videosRouter)
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})