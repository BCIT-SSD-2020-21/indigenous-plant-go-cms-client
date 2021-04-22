const express = require('express')

module.exports = function({database, verifyKey}) {
  const router = express.Router()

  //Get All
  //GET /api/revisions?key=<API_KEY>
  router.get('/', async (req, res) => {
    try {
      const result = await database.getRevisions()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/revisions?key=<API_KEY>
  router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const result = await database.createRevision({revisionName: req.body.revisionName})
      res.send("Revision added")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/revisions/:revisionId?key=<API_KEY>
  router.put('/:revisionId', async (req, res) => {
    try {
      const revisionId = req.params.revisionId
      const result = await database.updateRevision({revisionId, updatedRevision: req.body})
      res.send("Revision updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //DELETE /api/revisions/:revisionId?key=<API_KEY>
  router.delete('/:revisionId', async (req, res) => {
    try {
      const revisionId = req.params.revisionId
      const result = await database.deleteRevision({revisionId})
      res.send("Revison deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/revisions/:revisionId?key=<API_KEY>
  router.get('/:revisionId', async (req, res) => {
    try {
      const revisionId = req.params.revisionId
      const result = await database.getRevision({revisionId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}
