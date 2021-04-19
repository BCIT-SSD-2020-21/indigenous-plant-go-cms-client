const express = require('express')

module.exports = function({database}) {
  const router = express.Router()

  //Create
  //POST /api/users - register
  router.post('/', async (req, res) => {
    try {
      const result = await database.createUser(req.body)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get and compare
  //POST /api/users/login - login
  router.post('/login', async (req, res) => {
    try {
      const result = await database.getUser(req.body)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/users/:userId
  router.put('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId
      const result = await database.updateUser({userId, ...req.body})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //PUT /api/users/:userId
  router.delete('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId
      const result = await database.deleteUser({userId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}