const express = require('express')

module.exports = function({database, authorize, verifyKey}) {
  const router = express.Router()

  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getLearnMore()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  router.get('/:learnMoreId', verifyKey, async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.getLearnMoreById({learnMoreId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  
  return router
}