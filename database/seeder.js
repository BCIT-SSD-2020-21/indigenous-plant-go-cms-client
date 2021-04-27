const {MongoClient, ObjectID} = require('mongodb')
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
  const revision_history = db.collection('revision_history')
  const custom_fields = db.collection('custom_fields')
  const waypoint_categories = db.collection('waypoint_categories')
  const waypoint = db.collection('waypoint')
  const learn_more = db.collection('learn_more')
  const tour = db.collection('tour')
  const plant_categories = db.collection('plant_categories')
  const tour_categories = db.collection('tour_categories')

  // III. Insert Data to mongoDB
  // 1. Insert Users
  await users.insertMany([
    {
      "email" : "bob@test.ca",
      "username" : "Bob",
      "password" : "$2a$12$V.slVAcWMlWxKNw7qbYEcO5UvkYBOvMMu2nKvkyPVZh5bE93EfCUu",
      "role" : "Admin"    
    },
    {
      "email" : "charli@test.ca",
      "username" : "charli",
      "password" : "$2a$12$exIUEGDgWU.l2mJU78JIBOJvwA1j/OHmp5OidfVVfrEiFBotD91.C",
      "role" : "Manager"
    
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
    }
  ])

  // 3. Insert Videos
  await videos.insertMany([
    {
      "video_url": "https://www.youtube.com/watch?v=-EfK8OhRElI",
      "caption": "A lavender flower blooming timelapse"
    },
    {
      "video_url": "https://www.youtube.com/watch?v=lhqNduGgpC8",
      "caption": "A kinnikinnick flower blooming timelapse"
    }
  ])

  // 4. Insert Audios
  await audios.insertMany([
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/sound-1.mp3",
      "caption": "lavender"
    },
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/sound-2.mp3",
      "caption": "kinnikinnick"
    }
  ])

  // 5. Insert Locations
  await locations.insertMany([
    {
      "location_name": "SW1",
      "latitude": 49.251508,
      "longitude": -123.003891,
      "description": "infront of SW1"
    },
    {
      "location_name": "SW2",
      "latitude": 49.2516282,
      "longitude": -123.0003427,
      "description": "infront of SW2"
    }
  ])

     // Insert Waypoint Categories
    await waypoint_categories.insertMany([
      {
        "category_name" : "waypoint sw1",
      },
      {
        "category_name" : "waypoint sw2",
      }

    ])

    // 
    await plant_categories.insertMany([
      {
        "category_name": "Caryophyllaceae"
      },
      {
        "category_name": "Asteraceae"
      }
    ])

    await tour_categories.insertMany([
      {
        "category_name" : "english walk"
      },
      {
        "category_name" : "scenic"
      }
    ])

  // 6. Insert Categories
  const plant_category1 = await plant_categories.findOne({"category_name": "Caryophyllaceae"})
  const plant_category2 = await plant_categories.findOne({"category_name": "Asteraceae"})
  const tour_category1 = await tour_categories.findOne({"category_name" : "english walk"})
  const tour_category2 = await tour_categories.findOne({"category_name" : "scenic"})
  const waypoint_category1 = await waypoint_categories.findOne({"category_name" : "waypoint sw1"})
  const waypoint_category2 = await waypoint_categories.findOne({"category_name" : "waypoint sw2"})
  
  await categories.insertMany([
    {
      "category_name": "Plants",
      "plant_categories" : [plant_category1._id, plant_category2._id]
    },
    {
      "category_name": "Tours",
      "tour_categories" : [tour_category1._id, tour_category2._id]
    },
    {
      "category_name": "Waypoints",
      "waypoint_categories" : [waypoint_category1._id, waypoint_category2._id]
    }
   ])

  

  // 7. Insert Tags
  await tags.insertMany([
    {
      "tag_name": "healing"
    },
    {
      "tag_name": "luck"
    }
  ])

  // 8. Insert Custom Fields
  await custom_fields.insertMany([
    {
      "field_title" : "Water Intake",
      "content" : "Daily"
    },
    {
      "field_title" : "Color",
      "content" : "Indigo"
    }
  ])

  // 9. Insert Revision Histroy
  const user1 = await users.findOne({username: "Bob"})
  const user2 = await users.findOne({username: "charli"})

  await revision_history.insertMany([
    { 
      "user": user1._id,
      "date": "11/13/2020"
    },
    {
      "user": user2._id,
      "date": "10/1/2020"
    }
  ])

  // 10. Insert Plants
  const image1 = await images.findOne({"caption": "lavender"})
  const image2 = await images.findOne({"caption": "kinnikinnick"})
  const video1 = await videos.findOne({"video_url": "https://www.youtube.com/watch?v=-EfK8OhRElI"})
  const video2 = await videos.findOne({"video_url": "https://www.youtube.com/watch?v=lhqNduGgpC8"})
  const audio1 = await audios.findOne({"caption": "lavender"})
  const audio2 = await audios.findOne({"caption": "kinnikinnick"})
  const location1 = await locations.findOne({"location_name": "SW1"})
  const location2 = await locations.findOne({"location_name": "SW2"})
  
  const tag1 = await tags.findOne({"tag_name": "healing"})
  const tag2 = await tags.findOne({"tag_name": "luck"})
  const custom_field1 = await custom_fields.findOne({"field_title" : "Water Intake"})
  const custom_field2 = await custom_fields.findOne({"content" : "Daily"})
  const revision_history1 = await revision_history.findOne({"user": user1._id})
  const revision_history2 = await revision_history.findOne({"user": user2._id})
  
  await plants.insertMany([
    {
      "plant_name": "lavender",
      "scientific_name": "lavandula",
      "description": "Lavender is a perennial shrub with purple flowers that bloom during the summer",
      "images" : [image1._id],
      "videos" : [video1._id],
      "audios" : [audio1._id],
      "locations" : [location1._id],
      "categories" : [plant_category1._id],
      "tags" : [tag1._id],
      "custom_fields" : [custom_field1._id],
      "revision_histories" : [revision_history1._id]
    },
    {
      "plant_name": "kinnikinnick",
      "scientific_name": "arctostaphylos uva-ursi",
      "description": "Kinnikinnick is an evergreen ground cover. It has small white or pink flowers that typically bloom in May and June, and red berries later in the season. Kinnikinnick attracts butterflies and other pollinators. It’s a food source for wildlife all year round. ",
      "images" : [image2._id],
      "videos" : [video2._id],
      "audios" : [audio2._id],
      "locations" : [location2._id],
      "categories" : [plant_category2._id],
      "tags" : [tag2._id],
      "custom_fields" : [custom_field2._id],
      "revision_histories" : [revision_history2._id]
    }

  ])

  // 12. Insert Waypoint
  await waypoint.insertMany([
    {
      "waypoint_name": "Location A",
      "description": "Infront of SW1",
      "location": location1._id,
      "custom_fields": [custom_field1._id],
      "images": [image1._id],
     " audio_files": [audio1._id],
      "videos": [video1._id],
      "tags": [tag1._id],
      "categories": [waypoint_category1._id],
      "revision_history": [revision_history1._id],
    }
  ])

  // 13. Insert Learnmore
  await learn_more.insertMany([
    {
      "learn_more_title": "Other information",
      "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. ", // Should be stringified HTML
      "custom_fields": [custom_field1._id] ,
      "revision_history": [revision_history1._id],
    }
  ])
  
  // 14. Insert Tours
  const waypoint1 = await waypoint.findOne({"waypoint_name": "Location A"})
  const plant1 = await plants.findOne({ "plant_name": "lavender"})
 
  await tour.insertMany([
    {
      "tour_name": "The English Walk",
      "description:": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "custom_fields" : [custom_field1._id, custom_field2._id],
      "images" : [image1._id, image2._id],
      "audio_files" : [audio1._id, audio2._id],
      "videos" : [video1._id, video2._id],
      "tags" : [tag1._id, tag2._id],
      "categories" : [tour_category1._id],
      "waypoints" : [waypoint1],
      "plants" : [plant1._id],
      "revision_history" : [revision_history1._id]
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
