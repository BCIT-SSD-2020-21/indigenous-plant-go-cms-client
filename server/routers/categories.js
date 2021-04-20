const express = require('express')

module.exports = function({database, verifyKey}) {
  const router = express.Router()

  //Get All
  //GET /api/categories?key=<API_KEY>
  router.get('/', verifyKey, async (req, res) => {
    try {
      const result = await database.getCategories()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/categories/:categoryId?key=<API_KEY>
  router.get('/:categoryId', verifyKey, async (req, res) => {
    try {
      const caategoryId = req.params.categoryId
      const result = await database.getCategory({categoryId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}
