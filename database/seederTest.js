
const {MongoClient, ObjectID, Timestamp} = require('mongodb')
require('dotenv').config()

const url =  process.env.MONGO_DB_URL 
const dbName = process.env.MONGO_DB_NAME 
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

const seed = async () => {

  await client.connect()
  const db = client.db(dbName)

  // I. Drop Database | Clean Slate
  await db.dropDatabase()

  // II. List of  collections
  const users = db.collection('users')
  const plants = db.collection('plants')
  const images = db.collection('images')
  const audios = db.collection('audios')
  const videos = db.collection('videos')
  const locations = db.collection('locations')
  const categories = db.collection('categories')
  const tags = db.collection('tags')
  const revisions = db.collection('revisions')
  const waypoints = db.collection('waypoints')
  const learn_more = db.collection('learn_more')
  const tours = db.collection('tours')

  // III. Insert Data to mongoDB
  // 1. Insert Users
  await users.insertMany([
    {
      "email" : "bob@test.ca",
      "user_name" : "bob",
      "password" : "$2a$12$V.slVAcWMlWxKNw7qbYEcO5UvkYBOvMMu2nKvkyPVZh5bE93EfCUu",
      "role" : "Admin"    
    },
    {
      "email" : "charli@test.ca",
      "user_name" : "charli",
      "password" : "$2a$12$exIUEGDgWU.l2mJU78JIBOJvwA1j/OHmp5OidfVVfrEiFBotD91.C",
      "role" : "Manager"
    
    },
    {
      "email" : "patrick@test.ca",
      "user_name" : "patrick",
      "password" : "$2a$12$exIUEGDgWU.l2mJU78JIBOJvwA1j/OHmp5OidfVVfrEiFBotD91.C",
      "role" : "Admin"
    },
    {
      "email" : "wayne@test.ca",
      "user_name" : "wayne",
      "password" : "$2a$12$exIUEGDgWU.l2mJU78JIBOJvwA1j/OHmp5OidfVVfrEiFBotD91.C",
      "role" : "Admin"
    
    }
  ])

  // 2. Insert Images
  await images.insertMany([
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/lavender-1.png",
      "caption": "lavender"
    },
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/kinnikinnick-1.png",
      "caption": "kinnikinnick"
    },
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/gathering-place-1.jpg",
      "caption": "Indigenous Initiatives Gathering Place"
    },
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/threesisters-1.jpg",
      "caption": "The Three Sisters"
    },
    
  ])

  // 3. Insert Videos
  await videos.insertMany([
    {
      "video_url": "https://youtu.be/49BCc6FJEK8",
      "caption": "The Indigenous Initiatives Gathering Place"
    },
    {
      "video_url": "https://youtu.be/7g2ku5qT0ug",
      "caption": "The House Post "
    },
  ])

  // 5. Insert Locations
  await locations.insertMany([
    {
      "location_name": "Lavender 1",
      "latitude": 49.2545,
      "longitude": -122.99825,
      "description": "Lavender 1 description"
    },
    {
      "location_name": "Kinnikinnick 1",
      "latitude": 49.253722,
      "longitude":-122.998167,
      "description": "Kinnikinnich 1 description"
    },
    {
      "location_name": "The Three Sisters",
      "latitude": 49.250428,
      "longitude":-123.002965,
      "description": "Three Sisters description"
    },
    {
      "location_name": "The Indigenous Initiatives Gathering Place",
      "latitude": 49.2508575,
      "longitude":-123.0030182,
      "description": "The Indigenous Initiatives Gathering Place description"
    }
  ])

  // 6. Insert Categories
  await categories.insertMany([
    {
      "category_name": "medicinal plants",
      "resource": "plant",
    },
    {
      "category_name": "traditional plants",
      "resource": "plant",
    },
    {
      "category_name": "food plant",
      "resource": "plants",
    },
    {
      "category_name": "indigenous knowledge",
      "resource": "waypoint",
    },
    {
      "category_name": "community spaces",
      "resource": "waypoint",
    },
    {
      "category_name": "gardening",
      "resource": "waypoint",
    },

  ])
  
  
  // 10. Insert Tags
  await tags.insertMany([
    {
      "tag_name": "spring"
    },
    {
      "tag_name": "summer"
    },
    {
      "tag_name": "fall"
    },
    {
      "tag_name": "winter"
    },
    {
      "tag_name": "decorative"
    },
    {
      "tag_name": "attracts pollinators"
    },
    {
      "tag_name": "food source for wildlife"
    },
    {
      "tag_name": "food"
    },
    {
      "tag_name": "educational"
    },
    {
      "tag_name": "community spaces"
    },
    {
      "tag_name": "ceremonial spaces"
    }

  ])


  //Insert Plants
  //Lavender
  const imageLavender = await images.findOne({"caption": "lavender"})
  const locationLavender = await locations.findOne({"location_name": "Lavender 1"})
  const categoryLavender = await categories.findOne({"category_name": "food plant"})
  const tagLavender1 = await tags.findOne({"tag_name": "decorative"})
  const tagLavender2 = await tags.findOne({"tag_name": "summer"})

  //Kinnikinnick
  const imageKinnikinnick = await images.findOne({"caption": "kinnikinnick"})
  const locationKinnikinnick = await locations.findOne({"location_name": "SW2"})
  
  const tagKinnikinnick1 = await tags.findOne({"tag_name": "spring"})
  const tagKinnikinnick2 = await tags.findOne({"tag_name": "attracts pollinators"})
  const tagKinnikinnick3 = await tags.findOne({"tag_name": "food source for wildlife"})
  
  await plants.insertMany([
    {
      "plant_name": "lavender",
      "scientific_name": "lavandula",
      "description": "Lavender is a perennial shrub with purple flowers that bloom during the summer",
      "images" : [imageLavender._id],
      "locations" : [locationLavender._id],
      "categories" : [categoryLavender._id],
      "isPublish" : true,
      "tags" : [tagLavender1._id, tagLavender2._id],
    },
    {
      "plant_name": "kinnikinnick",
      "scientific_name": "arctostaphylos uva-ursi",
      "description": "Kinnikinnick is an evergreen ground cover. It has small white or pink flowers that typically bloom in May and June, and red berries later in the season. Kinnikinnick attracts butterflies and other pollinators. It’s a food source for wildlife all year round. ",
      "images" : [imageKinnikinnick._id],
      "locations" : [locationKinnikinnick._id],
      "tags" : [
        tagKinnikinnick1._id,
        tagKinnikinnick2._id,
        tagKinnikinnick3._id
      ],
      "isPublish" : true,
    }

  ])

  
  // 12. Insert Waypoint
  const locationThreeSisters = await locations.findOne({"location_name": "The Three Sisters"})
  const imagesThreeSisters = await images.findOne({"caption": "The Three Sisters"})
  const tagsThreeSisters1 = await tags.findOne({"tag_name": "food"})
  const tagsThreeSisters2 = await tags.findOne({"tag_name": "educational"})
  const tagsThreeSisters3 = await tags.findOne({"tag_name": "community spaces"})
  const categoryThreeSisters1 = await categories.findOne({"category_name": "gardening"})
  
  const locationGP = await locations.findOne({"location_name": "The Indigenous Initiatives Gathering Place"})
  const imagesGP = await images.findOne({"caption": "Indigenous Initiatives Gathering Place"})
  const tagsGP1 = await tags.findOne({"tag_name": "ceremonial spaces"})
  const tagsGP2 = await tags.findOne({"tag_name": "educational"})
  const tagsGP3 = await tags.findOne({"tag_name": "community spaces"})
  const categoryGP1 = await categories.findOne({"category_name": "community spaces"})
  const videoGP1 = await videos.findOne({ "caption": "The Indigenous Initiatives Gathering Place"})
  
  
  await waypoints.insertMany([
    {
      "waypoint_name": "The Three Sisters",
      "description": "Coming Soon – Corn, Beans and Squash are the Three Sisters.",
      "locations": [locationThreeSisters._id],
      "images": [imagesThreeSisters._id],
      "tags": [tagsThreeSisters1._id, tagsThreeSisters2._id, tagsThreeSisters3._id],
      "categories": [categoryThreeSisters1._id],
      "isPublish" : true
    },
    {
      "waypoint_name": "The Indigenous Initiatives Gathering Place",
      "description": "The Indigenous Gathering Place is a comfortable, welcoming and safe space for students, families and staff. Mi Chap Tukw, the BCIT Indigenous Gathering Place (IGP) is located on the Burnaby campus at SW1-1521.",
      "locations": [locationGP._id],
      "images": [imagesGP._id],
      "videos" : [videoGP1._id],
      "tags": [tagsGP1._id, tagsGP2._id, tagsGP3._id],
      "categories": [categoryGP1._id],
      "isPublish" : true
    }
  ])


}
 

// IV. Run function
;(async ()=> {
  await seed()
  console.log("Mongo Connected!!");
  await client.close();
}
)()
