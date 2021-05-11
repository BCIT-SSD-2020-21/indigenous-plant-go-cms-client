const {usersList} = require('./users')
const {categoriesList} = require('./categories')
const {tagsList } = require('./tags')
const {locationsList} = require("./locations")
const {imagesList} = require('./images')
const {audiosList} = require('./audios')
const {videosList} = require('./videos')

const {MongoClient, ObjectID, Timestamp} = require('mongodb')
require('dotenv').config()

const url = process.env.MONGO_DB_URL 
const dbName = "backup" //process.env.MONGO_DB_NAME_BACKUP
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

const seed = async () => {

  await client.connect()
  const db = client.db(dbName)

  // Drop Database | Clean Slate
  await db.dropDatabase()

  // List of  collections
  const users = db.collection('users')
  const images = db.collection('images')
  const audios = db.collection('audios')
  const videos = db.collection('videos')
  const locations = db.collection('locations')
  const categories = db.collection('categories')
  const tags = db.collection('tags')
  const waypoints = db.collection('waypoints')
  const plants = db.collection('plants')

  // INSERT DATA TO MONGODB

  await users.insertMany(usersList)
  await images.insertMany(imagesList)
  await videos.insertMany(videosList)
  await audios.insertMany(audiosList)
  await locations.insertMany(locationsList)
  await categories.insertMany(categoriesList)
  await tags.insertMany(tagsList)

  // Insert Plants

}

// IV. Run function
;(async ()=> {
  await seed()
  console.log("Mongo Connected!!");
  await client.close();
}
)()

