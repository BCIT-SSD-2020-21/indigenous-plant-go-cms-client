const express = require('express')

module.exports = function({database, verifyKey}) {
  const router = express.Router()

  //Get All
  //GET /api/locations?key=<API_KEY>
  router.get('/', async (req, res) => {
    try {
      const result = await database.getLocations()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/locations?key=<API_KEY>
  router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const result = await database.createLocation({locationName: req.body.locationName})
      res.send("Location added")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/locations/:locationId?key=<API_KEY>
  router.put('/:locationId', async (req, res) => {
    try {
      const locationId = req.params.locationId
      const result = await database.updateLocation({locationId, updatedLocation: req.body})
      res.send("Location updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //DELETE /api/locations/:locationId?key=<API_KEY>
  router.delete('/:locationId', async (req, res) => {
    try {
      const locationId = req.params.locationId
      const result = await database.deleteLocation({locationId})
      res.send("Location deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/locations/:locationId?key=<API_KEY>
  router.get('/:locationId', async (req, res) => {
    try {
      const locationId = req.params.locationId
      const result = await database.getLocation({locationId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}
