const express = require('express')

module.exports = function({database}) {
  const router = express.Router()

  //Get All
  //GET /api/categories?key=<API_KEY>
  router.get('/', async (req, res) => {
    try {
      const result = await database.getCategories()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/categories?key=<API_KEY>
  router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const result = await database.createCategory({categoryName: req.body.categoryName})
      res.send("Category added")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/categories/:categoryId?key=<API_KEY>
  router.put('/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.updateCategory({categoryId, updatedCategory: req.body})
      res.send("Category updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //DELETE /api/categories/:categoryId?key=<API_KEY>
  router.delete('/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.deleteCategory({categoryId})
      res.send("Category deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/categories/:categoryId?key=<API_KEY>
  router.get('/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.getCategory({categoryId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}
