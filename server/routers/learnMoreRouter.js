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

  
  return router
}