const express = require('express')

module.exports = function({database, authorize, verifyKey}) {
  const router = express.Router()

  //Get All
  //GET /api/plants?key=<API_KEY>
  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getPlants()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/plants?key=<API_KEY>
  router.post('/', authorize, verifyKey, async (req, res) => {
    try {
      const result = await database.createPlant({newPlant: req.body, user_id: req.user._id})
      res.send("Plant added")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}