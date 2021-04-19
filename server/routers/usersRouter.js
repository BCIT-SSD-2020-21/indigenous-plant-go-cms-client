const express = require('express')

module.exports = function({database, authorize, generateToken}) {
  const router = express.Router()

  //Create
  //POST /api/users - register
  router.post('/', async (req, res) => {
    try {
      const result = await database.createUser(req.body)
      const user = result.ops[0]
      const accessToken = generateToken({_id: user._id, email: user.email, username: user.username, role: user.role})
      res.send(accessToken)
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
      const accessToken = generateToken({_id: result._id, email: result.email, username: result.username, role: result.role})
      res.send(accessToken)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/users/:userId
  router.put('/:userId', authorize, async (req, res) => {
    try {
      const userId = req.params.userId
      const result = await database.updateUser({userId, ...req.body})
      res.send("User updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //PUT /api/users/:userId
  router.delete('/:userId', authorize, async (req, res) => {
    try {
      const userId = req.params.userId
      const result = await database.deleteUser({userId})
      res.send("User deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}