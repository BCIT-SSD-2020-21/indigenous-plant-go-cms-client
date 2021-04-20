const express = require('express')

module.exports = function({database, verifyKey, upload}) {
  const router = express.Router()

  //Get All
  //GET /api/images?key=<API_KEY>
  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getImages()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/images?key=<API_KEY>
  router.post('/', verifyKey, upload.single('image'), async (req, res) => {
    try {
      const file = req.file
      console.log(file)
      res.send(file)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/images/:imageId?key=<API_KEY>
  router.get('/:imageId', verifyKey, async (req, res) => {
    try {
      const imageId = req.params.imageId
      const result = await database.getImage({imageId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}