const express = require('express')

module.exports = function({database, verifyKey}) {
  const router = express.Router()

  //Get All
  //GET /api/tags?key=<API_KEY>
  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getTags()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/tags/:tagId?key=<API_KEY>
  router.get('/:tagId', verifyKey, async (req, res) => {
    try {
      const tagId = req.params.tagId
      const result = await database.getTag({tagId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}