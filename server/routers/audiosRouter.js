const express = require('express')

module.exports = function({database, verifyKey}) {
  const router = express.Router()

  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getAudios()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  router.get('/:audioId', verifyKey, async (req, res) => {
    try {
      const audioId = req.params.audioId
      const result = await database.getAudio({audioId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}