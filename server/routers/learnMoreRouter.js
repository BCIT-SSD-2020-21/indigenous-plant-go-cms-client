const express = require('express')

module.exports = function({database, authorize, verifyKey}) {
  const router = express.Router()

  //GET ALL
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

  //Create
  //POST /api/learn_more
  router.post('/', authorize, verifyKey, async (req, res) => {
    try {
      const result = await database.createPlant({newLearnMore: req.body, user_id: req.user._id})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  // PUT /api/learn_more/:learnMoreId
  router.put('/:learnMoreId', authorize, verifyKey, async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.updateLearnMore({learnMoreId, updatedLearnMore : req.body, user_id: req.user._id})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //DELETE 
  // DELETE /api/learn_more/:learnMoreId
  router.delete('/:learnMoreId', authorize, verifyKey, async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.deleteLearnMore({learnMoreId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}