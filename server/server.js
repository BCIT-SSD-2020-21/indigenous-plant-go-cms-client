const express = require('express')
const mongoDatabase = require('./mongoDatabase')

const app = express()
app.use(express.json())

mongoDatabase().then((database) => {
  console.log(database)
})

app.get('/', async (req, res) => {
  res.send("connected")
})

const port = process.env.port || 8080
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})