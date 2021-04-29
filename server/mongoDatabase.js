const {MongoClient, ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const url = process.env.MONGO_DB_URL
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

module.exports = async function() {
  await client.connect()

  const db = client.db()

  const users = db.collection('users')
  const images = db.collection('images')
  const audios = db.collection('audios')
  const videos = db.collection('videos')
  const tags = db.collection('tags')
  const categories = db.collection('categories')
  const locations = db.collection('locations')
  const revisions = db.collection('revisions')
  const plants = db.collection('plants')
  const waypoints = db.collection('waypoints')
  const tours = db.collection('tours')
  const learn_more = db.collection('learn_more')

  //Users

  //Create new user, use for register
  //Takes in email, username and password, role default to Manager
  //POST /api/users
  async function createUser({email, user_name, password, role="Manager"}) {
    //Check if email or username is repeating
    const user = await users.findOne({
      $or: [{email: email}, {user_name: user_name}]
    })
    if (user) {
      throw Error("Username or email is already taken")
    }

    if (!email) { //email can't be null
      throw Error("Requires an email")
    }

    if (!password) { //password can't be null
      throw Error("Requires a password")
    }

    //Hash password
    const encrypted = await bcrypt.hash(password, 12)

    const result = await users.insertOne({
      email,
      user_name,
      password: encrypted,
      role
    })

    //Need this to make jwt token later
    return result
  }

  //Get One user, use for login
  //Takes in email/username and password and find one user that match
  //POST /api/users/login
  async function getUser({user_name, password}) {
    const user = await users.findOne({
      $or: [{email: user_name}, {user_name: user_name}]
    })
    if (!user) {
      throw Error("Invalid user")
    }

    const same = await bcrypt.compare(password, user.password)
    if (!same) {
      throw Error("Password doesn't match")
    }

    return user
  }

  //Update One user, should be authorized
  //Update base on userId
  //PUT /api/users/:userId
  async function updateUser({userId, updatedUser, userRole}) {
    if (updatedUser.email || updatedUser.user_name) {
      const user = await users.findOne({
        $or: [{email: updatedUser.email}, {user_name: updatedUser.user_name}]
      })
      if (user) {
        if (user._id != userId) {
          throw Error("Username or email is already taken")
        }
      }
    }

    if (updatedUser.password) {
      //Hash password
      const encrypted = await bcrypt.hash(updatedUser.password, 12)
      updatedUser.password = encrypted
    }
    
    if (updatedUser.role) {
      if (userRole !== "Admin") {
        throw Error("No permission to update role")
      }
    }

    const result = await users.findOneAndUpdate(
      {_id: ObjectID(userId)},
      {$set: {...updatedUser}}
    )

    return result
  }

  //Delete One user, should be authorized
  //Delete user base on userId
  //DELETE /api/users/:userId
  async function deleteUser({userId}) {
    const result = await users.findOneAndDelete({
      _id: ObjectID(userId)
    })

    return result
  }

  //Images

  //Get All
  //GET /api/images
  async function getImages() {
    return await images.find().toArray()
  }

  //Create
  //Post /api/images
  async function createImage({url, updatedImage}) {
    if (!url) {
      throw Error("Missing image")
    }

    if (!updatedImage.caption) {
      throw Error("Missing caption")
    }

    const result = await images.insertOne({
      image_url: url,
      ...updatedImage
    })
    return result
  }

  //Get One
  //GET /api/images/:imageId
  async function getImage({imageId}) {
    return await images.findOne({_id: ObjectID(imageId)})
  }

  //Update
  //PUT /api/images/:imageId
  async function updateImage({imageId, url, updatedImage, s3}) {
    //There is a new url, delete the old one from s3
    if (url) {
      const image = await images.findOne({_id: ObjectID(imageId)})
      if (image.image_url) {
        s3.deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.image_url.split(".com/")[1]
        }, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log("Success")
          }
        })
      }

      await images.findOneAndUpdate(
        {_id: ObjectID(imageId)},
        {$set: {
          image_url: url
        }}
      )
    }

    const result = await images.findOneAndUpdate(
      {_id: ObjectID(imageId)},
      {$set: {
        ...updatedImage
      }}
    )

    return result
  }

  //Delete
  //DELETE /api/images/:imageId
  async function deleteImage({imageId, s3}) {
    //Delete the image from s3 if there is any
    const image = await images.findOne({_id: ObjectID(imageId)})
    if (image.image_url) {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.image_url.split(".com/")[1]
      }, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
        }
      })
    }

    const result = await images.findOneAndDelete({
      _id: ObjectID(imageId)
    })

    return result
  }

  //Audios

  //Get All
  //GET /api/audios
  async function getAudios() {
    return await audios.find().toArray()
  }

  //Create
  //Post /api/audios
  async function createAudio({url, updatedAudio}) {
    if (!url) {
      throw Error("Missing audio")
    }

    if (!updatedAudio.caption) {
      throw Error("Missing caption")
    }

    const result = await audios.insertOne({
      audio_file_url: url,
      ...updatedAudio
    })
    return result
  }

  //Get One
  //GET /api/audios/:audioId
  async function getAudio({audioId}) {
    return await audios.findOne({_id: ObjectID(audioId)})
  }

  //Update
  //PUT /api/audios/:audioId
  async function updateAudio({audioId, url, updatedAudio, s3}) {
    //There is a new url, delete the old one from s3
    if (url) {
      const audio = await audios.findOne({_id: ObjectID(audioId)})
      if (audio.audio_file_url) {
        s3.deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: audio.audio_file_url.split(".com/")[1]
        }, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log("Success")
          }
        })
      }

      await audios.findOneAndUpdate(
        {_id: ObjectID(audioId)},
        {$set: {
          audio_file_url: url
        }}
      )
    }

    const result = await audios.findOneAndUpdate(
      {_id: ObjectID(audioId)},
      {$set: {
        ...updatedAudio
      }}
    )

    return result
  }

  //Delete
  //DELETE /api/audios/:audioId
  async function deleteAudio({audioId, s3}) {
    //Delete file from s3
    const audio = await audios.findOne({_id: ObjectID(audioId)})
    if (audio.audio_file_url) {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: audio.audio_file_url.split(".com/")[1]
      }, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
        }
      })
    }

    const result = await audios.findOneAndDelete({
      _id: ObjectID(audioId)
    })

    return result
  }

  //Videos

  //Get All
  //GET /api/videos
  async function getVideos() {
    return await videos.find().toArray()
  }

  //Create
  //Post /api/videos
  async function createVideo({url, updatedVideo}) {
    if (!url) {
      throw Error("Missing video")
    }

    if (!updatedVideo.caption) {
      throw Error("Missing caption")
    }

    const result = await videos.insertOne({
      video_url: url,
      ...updatedVideo
    })
    return result
  }

  //Get One
  //GET /api/videos/:videoId
  async function getVideo({videoId}) {
    return await videos.findOne({_id: ObjectID(videoId)})
  }

  //Update
  //PUT /api/videos/:videoId
  async function updateVideo({videoId, url, updatedVideo, s3}) {
    //There is a new url, delete the old one from s3
    if (url) {
      const video = await videos.findOne({_id: ObjectID(videoId)})
      if (video.video_url) {
        s3.deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: video.video_url.split(".com/")[1]
        }, function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log("Success")
          }
        })
      }

      await videos.findOneAndUpdate(
        {_id: ObjectID(videoId)},
        {$set: {
          video_url: url
        }}
      )
    }

    const result = await videos.findOneAndUpdate(
      {_id: ObjectID(videoId)},
      {$set: {
        ...updatedVideo
      }}
    )

    return result
  }

  //Delete
  //DELETE /api/videos/:videoId
  async function deleteVideo({videoId, s3}) {
    //Delete file from s3
    const video = await videos.findOne({_id: ObjectID(videoId)})
    if (video.video_url) {
      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: video.video_url.split(".com/")[1]
      }, function(err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
        }
      })
    }

    const result = await videos.findOneAndDelete({
      _id: ObjectID(videoId)
    })

    return result
  }

  //Tags
  
  //Get All
  //GET /api/tags
  async function getTags() {
    return await tags.find().toArray()
  }

  //Create
  //POST /api/tags
  async function createTag({tag_name}) {
    if (!tag_name) {
      throw Error("Require a tag name")
    }

    const result = await tags.insertOne({
      tag_name
    })
    return result
  }

  //Get One
  //Get /api/tags/:tagId
  async function getTag({tagId}) {
    return await tags.findOne({_id: ObjectID(tagId)})
  }

  //Update
  //PUT /api/tags/:tagId
  async function updateTag({tagId, updatedTag}) {
    const result = await tags.findOneAndUpdate(
      {_id: ObjectID(tagId)},
      {$set: {...updatedTag}}
    )
    return result
  }

  //Delete
  //DELETE /api/tags/:tagId
  async function deleteTag({tagId}) {
    const result = await tags.findOneAndDelete({
      _id: ObjectID(tagId)
    })
    return result
  }

  //Categories

  //Get All
  //GET /api/categories
  async function getCategories() {
    return await categories.find().toArray()
  }

  //Create
  //POST /api/categories
  async function createCategory({category_name, resource}) {
    if (!category_name) {
      throw Error("Require a category name")
    }

    if (!resource) {
      throw Error("Require a resource")
    }

    const result = await categories.insertOne({
      category_name,
      resource
    })
    return result
  }

  //Get One
  //GET /api/categories/:categoryId
  async function getCategory({categoryId}) {
    return await categories.findOne({_id: ObjectID(categoryId)})
  }

  //Update
  //PUT /api/categories/:categoryId
  async function updateCategory({categoryId, updatedCategory}) {
    const result = await categories.findOneAndUpdate(
      {_id: ObjectID(categoryId)},
      {$set: {...updatedCategory}}
    )
    return result
  }
  
  //Delete
  //DELETE /api/categories/:categoryId
  async function deleteCategory({categoryId}) {
    const result = await categories.findOneAndDelete({
      _id: ObjectID(categoryId)
    })
    return result
  }

  //Get base on resource
  //GET /api/categories/group/:group?key=<API_KEY>
  async function getCategoryGroup({group}) {
    return await categories.find({resource: group}).toArray()
  }

  //Locations
  
  //Get All
  //GET /api/locations
  async function getLocations() {
    return await locations.find().toArray()
  }

  //Create
  //POST /api/locations
  async function createLocation({location_name, longitude, latitude, description=""}) {
    if (!location_name) {
      throw Error("Require a location name")
    }

    if (!longitude) {
      throw Error("Require a longtitude")
    }

    if (!latitude) {
      throw Error("Require a longtitude")
    }

    const result = await locations.insertOne({
      location_name,
      longitude,
      latitude,
      description
    })
    return result
  }

  //Get One
  //GET /api/locations/:locationId
  async function getLocation({locationId}) {
    return await locations.findOne({_id: ObjectID(locationId)})
  }

  //Update
  //PUT /api/locations/:locationId
  async function updateLocation({locationId, updatedLocation}) {
    const result = await locations.findOneAndUpdate(
      {_id: ObjectID(locationId)},
      {$set: {...updatedLocation}}
    )
    return result
  }
  
  //Delete
  //DELETE /api/locations/:locationId
  async function deleteLocation({locationId}) {
    const result = await locations.findOneAndDelete({
      _id: ObjectID(locationId)
    })
    return result
  }

  //Revisions
  
  //Get All
  //GET /api/revisions
  async function getRevisions() {
    return await revisions.find().toArray()
  }

  //Create
  //POST /api/revisions
  async function createRevision({user_id}) {
    if(!user_id) {
      throw Error("User id missing")
    }

    const result = await revisions.insertOne({
      user: ObjectID(user_id),
      date: Date.now()
    })
    return result
  }

  //Get One
  //GET /api/revisions/:revisionId
  async function getRevision({revisionId}) {
    return await revisions.findOne({_id: ObjectID(revisionId)})
  }
  
  //Delete
  //DELETE /api/revisions/:revisionId
  async function deleteRevision({revisionId}) {
    const result = await revisions.findOneAndDelete({
      _id: ObjectID(revisionId)
    })
    return result
  }

  //Plant

  //Get All
  //GET /api/plants
  async function getPlants() {
    //Fields like images must be array of ObjectId
    //Should convert all the ObjectId array to array of their respective item
    const aggregateOptions = [
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'locations',
          foreignField: '_id',
          as: 'locations'
        }
      },
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          plant_name: {$first: '$plant_name'},
          scientific_name: {$first: '$scientific_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          locations: {$first: '$locations'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await plants.aggregate(aggregateOptions).toArray()
  }

  //Create
  //POST /api/plants
  async function createPlant({newPlant, user_id}) {
    //Check required none array field first
    if(!newPlant.plant_name) {
      throw Error("Missing plant name")
    }

    if(!newPlant.scientific_name) {
      throw Error("Missing scientific name")
    }

    if(!newPlant.description) {
      throw Error("Missing description")
    }

    //Convert all passed in array of id to ObjectId
    //Require passing in array of string
    //Default to empty array if the field is not given
    if(newPlant.images) {
      newPlant.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    } else {
      newPlant.images = []
    }

    if(newPlant.audio_files) {
      newPlant.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    } else {
      newPlant.audio_files = []
    }

    if(newPlant.videos) {
      newPlant.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    } else {
      newPlant.videos = []
    }

    if(newPlant.tags) {
      newPlant.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    } else {
      newPlant.tags = []
    }

    if(newPlant.categories) {
      newPlant.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    } else {
      newPlant.categories = []
    }

    if(newPlant.locations) {
      newPlant.locations.forEach((location, index, self) => {
        self[index] = ObjectID(location)
      })
    } else {
      newPlant.locations = []
    }

    if(newPlant.custom_fields) {
      newPlant.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(temp._id)
        self[index] = temp
      })
    }else {
      newPlant.custom_fields = []
    }

    //New revision for when plant is created
    const revision = await createRevision({user_id: user_id})

    newPlant.revision_history = [ObjectID(revision.ops[0]._id)]

    const result = await plants.insertOne({
      ...newPlant
    })
    return result
  }

  //Get One
  //GET /api/plants/:plantId
  async function getPlant({plantId}) {
    const aggregateOptions = [
      {
        $match: {
          _id: ObjectID(plantId)
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'locations',
          foreignField: '_id',
          as: 'locations'
        }
      },
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          plant_name: {$first: '$plant_name'},
          scientific_name: {$first: '$scientific_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          locations: {$first: '$locations'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await plants.aggregate(aggregateOptions).next()
  }

  //Update
  //PUT /api/plants/:plantId
  async function updatePlant({plantId, updatedPlant, user_id}) {
    //Convert all passed in array of id to ObjectId
    //User should get data of the plant when they start editing
    if(updatedPlant.images) {
      updatedPlant.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    }

    if(updatedPlant.audio_files) {
      updatedPlant.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    }

    if(updatedPlant.videos) {
      updatedPlant.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    }

    if(updatedPlant.tags) {
      updatedPlant.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    }

    if(updatedPlant.categories) {
      updatedPlant.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    }

    if(updatedPlant.locations) {
      updatedPlant.locations.forEach((location, index, self) => {
        self[index] = ObjectID(location)
      })
    }

    if(updatedPlant.custom_fields) {
      updatedPlant.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(custom_field._id)
        self[index] = temp
      })
    }
   
    //New revision for when plant is updated
    const revision = await createRevision({user_id: user_id})

    const plant = await plants.findOne({_id: ObjectID(plantId)})
    updatedPlant.revision_history = plant.revision_history
    updatedPlant.revision_history.push(ObjectID(revision.ops[0]._id))

    const result = await plants.findOneAndUpdate(
      {_id: ObjectID(plantId)},
      {$set: {...updatedPlant}}
    )
    return result
  }
  
  //Delete
  //DELETE /api/plants/:plantId
  async function deletePlant({plantId}) {
    const plant = await plants.findOne({_id: ObjectID(plantId)})
    plant.revision_history.forEach(async(revision) => {
      await deleteRevision({revisionId: revision})
    })

    const result = await plants.findOneAndDelete({
      _id: ObjectID(plantId)
    })
    return result
  }

  //Waypoint

  //Get All
  //GET /api/waypoints
  async function getWaypoints() {
    //Fields like images must be array of ObjectId
    //Should convert all the ObjectId array to array of their respective item
    const aggregateOptions = [
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'location',
          foreignField: '_id',
          as: 'location'
        }
      },
      //Plant
      {
        $lookup: {
          from: 'plants',
          localField: 'plants',
          foreignField: '_id',
          as: 'plants'
        }
      },
      {
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'plants.images',
          foreignField: '_id',
          as: 'plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'plants.audio_files',
          foreignField: '_id',
          as: 'plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'plants.videos',
          foreignField: '_id',
          as: 'plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'plants.tags',
          foreignField: '_id',
          as: 'plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'plants.categories',
          foreignField: '_id',
          as: 'plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'plants.locations',
          foreignField: '_id',
          as: 'plants.locations'
        }
      },
      //Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'plants.revision_history',
          foreignField: '_id',
          as: 'plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'plants.revision_history.user',
          foreignField: '_id',
          as: 'plants.revision_history.user'
        }
      },
      //Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          waypoint_name: {$first: '$waypoint_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          location: {$first: '$location'},
          plants: {$first: '$plants'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'plants.revision_history.user.password': 0,
          'plants.revision_history.user.role': 0,
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await waypoints.aggregate(aggregateOptions).toArray()
  }

  //Create
  //POST /api/waypoints
  async function createWaypoint({newWaypoint, user_id}) {
    //Check required none array field first
    if(!newWaypoint.waypoint_name) {
      throw Error("Missing waypoint name")
    }

    if(!newWaypoint.description) {
      throw Error("Missing description")
    }

    //Convert all passed in array of id to ObjectId
    //Require passing in array of string
    //Default to empty array if the field is not given
    if(newWaypoint.images) {
      newWaypoint.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    } else {
      newWaypoint.images = []
    }

    if(newWaypoint.audio_files) {
      newWaypoint.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    } else {
      newWaypoint.audio_files = []
    }

    if(newWaypoint.videos) {
      newWaypoint.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    } else {
      newWaypoint.videos = []
    }

    if(newWaypoint.tags) {
      newWaypoint.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    } else {
      newWaypoint.tags = []
    }

    if(newWaypoint.categories) {
      newWaypoint.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    } else {
      newWaypoint.categories = []
    }

    if(newWaypoint.location) {
      newWaypoint.location = ObjectID(newWaypoint.location)
    } else {
      throw Error("Missing location")
    }

    if(newWaypoint.plants) {
      newWaypoint.plants.forEach((plant, index, self) => {
        self[index] = ObjectID(plant)
      })
    } else {
      newWaypoint.plants = []
    }

    if(newWaypoint.custom_fields) {
      newWaypoint.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(temp._id)
        self[index] = temp
      })
    }else {
      newWaypoint.custom_fields = []
    }

    //New revision for when waypoint is created
    const revision = await createRevision({user_id: user_id})

    newWaypoint.revision_history = [ObjectID(revision.ops[0]._id)]

    const result = await waypoints.insertOne({
      ...newWaypoint
    })
    return result
  }

  //Get One
  //GET /api/waypoints/:waypointId
  async function getWaypoint({waypointId}) {
    const aggregateOptions = [
      {
        $match: {
          _id: ObjectID(waypointId)
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'location',
          foreignField: '_id',
          as: 'location'
        }
      },
      //Plant
      {
        $lookup: {
          from: 'plants',
          localField: 'plants',
          foreignField: '_id',
          as: 'plants'
        }
      },
      {
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'plants.images',
          foreignField: '_id',
          as: 'plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'plants.audio_files',
          foreignField: '_id',
          as: 'plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'plants.videos',
          foreignField: '_id',
          as: 'plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'plants.tags',
          foreignField: '_id',
          as: 'plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'plants.categories',
          foreignField: '_id',
          as: 'plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'plants.locations',
          foreignField: '_id',
          as: 'plants.locations'
        }
      },
      //Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'plants.revision_history',
          foreignField: '_id',
          as: 'plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'plants.revision_history.user',
          foreignField: '_id',
          as: 'plants.revision_history.user'
        }
      },
      //Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          waypoint_name: {$first: '$waypoint_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          location: {$first: '$location'},
          plants: {$first: '$plants'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'plants.revision_history.user.password': 0,
          'plants.revision_history.user.role': 0,
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await waypoints.aggregate(aggregateOptions).next()
  }

  //Update
  //PUT /api/waypoints/:waypointId
  async function updateWaypoint({waypointId, updatedWaypoint, user_id}) {
    //Convert all passed in array of id to ObjectId
    //User should get data of the waypoint when they start editing
    if(updatedWaypoint.images) {
      updatedWaypoint.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    }

    if(updatedWaypoint.audio_files) {
      updatedWaypoint.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    }

    if(updatedWaypoint.videos) {
      updatedWaypoint.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    }

    if(updatedWaypoint.tags) {
      updatedWaypoint.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    }

    if(updatedWaypoint.categories) {
      updatedWaypoint.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    }

    if(updatedWaypoint.location) {
      updatedWaypoint.location = ObjectID(updatedWaypoint.location)
    }

    if(updatedWaypoint.plants) {
      updatedWaypoint.plants.forEach((plant, index, self) => {
        self[index] = ObjectID(plant)
      })
    }

    if(updatedWaypoint.custom_fields) {
      updatedWaypoint.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(custom_field._id)
        self[index] = temp
      })
    }


    //New revision for when waypoint is updated
    const revision = await createRevision({user_id: user_id})

    const waypoint = await waypoints.findOne({_id: ObjectID(waypointId)})
    updatedWaypoint.revision_history = waypoint.revision_history
    updatedWaypoint.revision_history.push(ObjectID(revision.ops[0]._id))

    const result = await waypoints.findOneAndUpdate(
      {_id: ObjectID(waypointId)},
      {$set: {...updatedWaypoint}}
    )
    return result
  }
  
  //Delete
  //DELETE /api/waypoints/:waypointId
  async function deleteWaypoint({waypointId}) {
    const waypoint = await waypoints.findOne({_id: ObjectID(waypointId)})
    waypoint.revision_history.forEach(async(revision) => {
      await deleteRevision({revisionId: revision})
    })

    const result = await waypoints.findOneAndDelete({
      _id: ObjectID(waypointId)
    })
    return result
  }

  //Tour

  //Get All
  //GET /api/tours
  async function getTours() {
    //Fields like images must be array of ObjectId
    //Should convert all the ObjectId array to array of their respective item
    const aggregateOptions = [
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      //Plants
      {
        $lookup: {
          from: 'plants',
          localField: 'plants',
          foreignField: '_id',
          as: 'plants'
        }
      },
      {
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'plants.images',
          foreignField: '_id',
          as: 'plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'plants.audio_files',
          foreignField: '_id',
          as: 'plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'plants.videos',
          foreignField: '_id',
          as: 'plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'plants.tags',
          foreignField: '_id',
          as: 'plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'plants.categories',
          foreignField: '_id',
          as: 'plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'plants.locations',
          foreignField: '_id',
          as: 'plants.locations'
        }
      },
      //Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'plants.revision_history',
          foreignField: '_id',
          as: 'plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'plants.revision_history.user',
          foreignField: '_id',
          as: 'plants.revision_history.user'
        }
      },
      //Waypoint
      {
        $lookup: {
          from: 'waypoints',
          localField: 'waypoints',
          foreignField: '_id',
          as: 'waypoints'
        }
      },
      {
        $unwind: {
          path: '$waypoints',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'waypoints.images',
          foreignField: '_id',
          as: 'waypoints.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'waypoints.audio_files',
          foreignField: '_id',
          as: 'waypoints.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'waypoints.videos',
          foreignField: '_id',
          as: 'waypoints.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'waypoints.tags',
          foreignField: '_id',
          as: 'waypoints.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'waypoints.categories',
          foreignField: '_id',
          as: 'waypoints.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'waypoints.location',
          foreignField: '_id',
          as: 'waypoints.location'
        }
      },
      //Waypoint Plant
      {
        $lookup: {
          from: 'plants',
          localField: 'waypoints.plants',
          foreignField: '_id',
          as: 'waypoints.plants'
        }
      },
      {
        $unwind: {
          path: '$waypoints.plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'waypoints.plants.images',
          foreignField: '_id',
          as: 'waypoints.plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'waypoints.plants.audio_files',
          foreignField: '_id',
          as: 'waypoints.plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'waypoints.plants.videos',
          foreignField: '_id',
          as: 'waypoints.plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'waypoints.plants.tags',
          foreignField: '_id',
          as: 'waypoints.plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'waypoints.plants.categories',
          foreignField: '_id',
          as: 'waypoints.plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'waypoints.plants.locations',
          foreignField: '_id',
          as: 'waypoints.plants.locations'
        }
      },
      //Waypoint Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'waypoints.plants.revision_history',
          foreignField: '_id',
          as: 'waypoints.plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$waypoints.plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'waypoints.plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'waypoints.plants.revision_history.user',
          foreignField: '_id',
          as: 'waypoints.plants.revision_history.user'
        }
      },
      //Waypoint Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'waypoints.revision_history',
          foreignField: '_id',
          as: 'waypoints.revision_history'
        }
      },
      {
        $unwind: {
          path: '$waypoints.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'waypoints.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'waypoints.revision_history.user',
          foreignField: '_id',
          as: 'waypoints.revision_history.user'
        }
      },
      //Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          tour_name: {$first: '$tour_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          plants: {$first: '$plants'},
          waypoints: {$first: '$waypoints'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'plants.revision_history.user.password': 0,
          'plants.revision_history.user.role': 0,
          'waypoints.plants.revision_history.user.password': 0,
          'waypoints.plants.revision_history.user.role': 0,
          'waypoints.revision_history.user.password': 0,
          'waypoints.revision_history.user.role': 0,
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await tours.aggregate(aggregateOptions).toArray()
  }

  //Create
  //POST /api/tours
  async function createTour({newTour, user_id}) {
    //Check required none array field first
    if(!newTour.tour_name) {
      throw Error("Missing tour name")
    }

    if(!newTour.description) {
      throw Error("Missing description")
    }

    //Convert all passed in array of id to ObjectId
    //Require passing in array of string
    //Default to empty array if the field is not given
    if(newTour.images) {
      newTour.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    } else {
      newTour.images = []
    }

    if(newTour.audio_files) {
      newTour.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    } else {
      newTour.audio_files = []
    }

    if(newTour.videos) {
      newTour.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    } else {
      newTour.videos = []
    }

    if(newTour.tags) {
      newTour.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    } else {
      newTour.tags = []
    }

    if(newTour.categories) {
      newTour.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    } else {
      newTour.categories = []
    }

    if(newTour.plants) {
      newTour.plants.forEach((plant, index, self) => {
        self[index] = ObjectID(plant)
      })
    } else {
      newTour.plants = []
    }

    if(newTour.waypoints) {
      newTour.waypoints.forEach((waypoint, index, self) => {
        self[index] = ObjectID(waypoint)
      })
    } else {
      newTour.waypoints = []
    }

    if(newTour.custom_fields) {
      newTour.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(temp._id)
        self[index] = temp
      })
    }else {
      newTour.custom_fields = []
    }

    //New revision for when tour is created
    const revision = await createRevision({user_id: user_id})

    newTour.revision_history = [ObjectID(revision.ops[0]._id)]

    const result = await tours.insertOne({
      ...newTour
    })
    return result
  }

  //Get One
  //GET /api/tours/:tourId
  async function getTour({tourId}) {
    const aggregateOptions = [
      {
        $match: {
          _id: ObjectID(tourId)
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      //Plant
      {
        $lookup: {
          from: 'plants',
          localField: 'plants',
          foreignField: '_id',
          as: 'plants'
        }
      },
      {
        $unwind: {
          path: '$plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'plants.images',
          foreignField: '_id',
          as: 'plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'plants.audio_files',
          foreignField: '_id',
          as: 'plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'plants.videos',
          foreignField: '_id',
          as: 'plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'plants.tags',
          foreignField: '_id',
          as: 'plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'plants.categories',
          foreignField: '_id',
          as: 'plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'plants.locations',
          foreignField: '_id',
          as: 'plants.locations'
        }
      },
      //Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'plants.revision_history',
          foreignField: '_id',
          as: 'plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'plants.revision_history.user',
          foreignField: '_id',
          as: 'plants.revision_history.user'
        }
      },
      //Waypoint
      {
        $lookup: {
          from: 'waypoints',
          localField: 'waypoints',
          foreignField: '_id',
          as: 'waypoints'
        }
      },
      {
        $unwind: {
          path: '$waypoints',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'waypoints.images',
          foreignField: '_id',
          as: 'waypoints.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'waypoints.audio_files',
          foreignField: '_id',
          as: 'waypoints.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'waypoints.videos',
          foreignField: '_id',
          as: 'waypoints.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'waypoints.tags',
          foreignField: '_id',
          as: 'waypoints.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'waypoints.categories',
          foreignField: '_id',
          as: 'waypoints.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'waypoints.location',
          foreignField: '_id',
          as: 'waypoints.location'
        }
      },
      //Waypoint Plant
      {
        $lookup: {
          from: 'plants',
          localField: 'waypoints.plants',
          foreignField: '_id',
          as: 'waypoints.plants'
        }
      },
      {
        $unwind: {
          path: '$waypoints.plants',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'waypoints.plants.images',
          foreignField: '_id',
          as: 'waypoints.plants.images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'waypoints.plants.audio_files',
          foreignField: '_id',
          as: 'waypoints.plants.audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'waypoints.plants.videos',
          foreignField: '_id',
          as: 'waypoints.plants.videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'waypoints.plants.tags',
          foreignField: '_id',
          as: 'waypoints.plants.tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'waypoints.plants.categories',
          foreignField: '_id',
          as: 'waypoints.plants.categories'
        }
      },
      {
        $lookup: {
          from: 'locations',
          localField: 'waypoints.plants.locations',
          foreignField: '_id',
          as: 'waypoints.plants.locations'
        }
      },
      //Waypoint Plant Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'waypoints.plants.revision_history',
          foreignField: '_id',
          as: 'waypoints.plants.revision_history'
        }
      },
      {
        $unwind: {
          path: '$waypoints.plants.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'waypoints.plants.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'waypoints.plants.revision_history.user',
          foreignField: '_id',
          as: 'waypoints.plants.revision_history.user'
        }
      },
      //Waypoint Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'waypoints.revision_history',
          foreignField: '_id',
          as: 'waypoints.revision_history'
        }
      },
      {
        $unwind: {
          path: '$waypoints.revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'waypoints.revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'waypoints.revision_history.user',
          foreignField: '_id',
          as: 'waypoints.revision_history.user'
        }
      },
      //Revision
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          tour_name: {$first: '$tour_name'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          plants: {$first: '$plants'},
          waypoints: {$first: '$waypoints'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'plants.revision_history.user.password': 0,
          'plants.revision_history.user.role': 0,
          'waypoints.plants.revision_history.user.password': 0,
          'waypoints.plants.revision_history.user.role': 0,
          'waypoints.revision_history.user.password': 0,
          'waypoints.revision_history.user.role': 0,
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await tours.aggregate(aggregateOptions).next()
  }

  //Update
  //PUT /api/tours/:tourId
  async function updateTour({tourId, updatedTour, user_id}) {
    //Convert all passed in array of id to ObjectId
    //User should get data of the tour when they start editing
    if(updatedTour.images) {
      updatedTour.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    }

    if(updatedTour.audio_files) {
      updatedTour.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    }

    if(updatedTour.videos) {
      updatedTour.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    }

    if(updatedTour.tags) {
      updatedTour.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    }

    if(updatedTour.categories) {
      updatedTour.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    }

    if(updatedTour.plants) {
      updatedTour.plants.forEach((plant, index, self) => {
        self[index] = ObjectID(plant)
      })
    }

    if(updatedTour.waypoints) {
      updatedTour.waypoints.forEach((waypoint, index, self) => {
        self[index] = ObjectID(waypoint)
      })
    }

    if(updatedTour.custom_fields) {
      updatedTour.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(custom_field._id)
        self[index] = temp
      })
    }

    //New revision for when tour is updated
    const revision = await createRevision({user_id: user_id})

    const tour = await tours.findOne({_id: ObjectID(tourId)})
    updatedTour.revision_history = tour.revision_history
    updatedTour.revision_history.push(ObjectID(revision.ops[0]._id))

    const result = await tours.findOneAndUpdate(
      {_id: ObjectID(tourId)},
      {$set: {...updatedTour}}
    )
    return result
  }
  
  //Delete
  //DELETE /api/tours/:tourId
  async function deleteTour({tourId}) {
    const tour = await tours.findOne({_id: ObjectID(tourId)})
    tour.revision_history.forEach(async(revision) => {
      await deleteRevision({revisionId: revision})
    })

    const result = await tours.findOneAndDelete({
      _id: ObjectID(tourId)
    })
    return result
  }

  //Learn More

  //Get All
  //GET /api/learn_more
  async function getLearnMores(){
    const aggregateOptions = [
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          learn_more_title: {$first: '$learn_more_title'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]
    console.log(await learn_more.find().toArray())
    return await learn_more.aggregate(aggregateOptions).toArray()
  }

  //Create
  //POST /api/learn_more
  async function createLearnMore({newLearnMore, user_id}) {
    //Check required none array field first
    if(!newLearnMore.learn_more_title) {
      throw Error("Missing title")
    }

    if(!newLearnMore.description) {
      throw Error("Missing description")
    }
   
    if(newLearnMore.images) {
      newLearnMore.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    } else {
      newLearnMore.images = []
    }

    if(newLearnMore.audio_files) {
      newLearnMore.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    } else {
      newLearnMore.audio_files = []
    }

    if(newLearnMore.videos) {
      newLearnMore.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    } else {
      newLearnMore.videos = []
    }

    if(newLearnMore.tags) {
      newLearnMore.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    } else {
      newLearnMore.tags = []
    }

    if(newLearnMore.categories) {
      newLearnMore.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    } else {
      newLearnMore.categories = []
    }

    if(newLearnMore.custom_fields) {
      newLearnMore.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(temp._id)
        self[index] = temp
      })
    }else {
      newLearnMore.custom_fields = []
    }


    //New revision for when learn_more is created
    const revision = await createRevision({user_id: user_id})

    newLearnMore.revision_history = [ObjectID(revision.ops[0]._id)]

    const result = await learn_more.insertOne({
      ...newLearnMore
    })
    return result
  }

  //Get One
  //GET /api/learn_more/:learnMoreId
  async function getLearnMore({learnMoreId}) {
    const aggregateOptions = [
      {
        $match: {
          _id: ObjectID(learnMoreId)
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $lookup: {
          from: 'audios',
          localField: 'audio_files',
          foreignField: '_id',
          as: 'audio_files'
        }
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videos',
          foreignField: '_id',
          as: 'videos'
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $lookup: {
          from: 'revisions',
          localField: 'revision_history',
          foreignField: '_id',
          as: 'revision_history'
        }
      },
      {
        $unwind: {
          path: '$revision_history',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          'revision_history.date': -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'revision_history.user',
          foreignField: '_id',
          as: 'revision_history.user'
        }
      },
      {
        $group: {
          _id: '$_id',
          learn_more_title: {$first: '$learn_more_title'},
          description: {$first: '$description'},
          images: {$first: '$images'},
          audio_files: {$first: '$audio_files'},
          videos: {$first: '$videos'},
          tags: {$first: '$tags'},
          categories: {$first: '$categories'},
          custom_fields: {$first: '$custom_fields'},
          revision_history: {$push: '$revision_history'}
        }
      },
      {
        $project: {
          'revision_history.user.password': 0,
          'revision_history.user.role': 0
        }
      }
    ]

    return await learn_more.aggregate(aggregateOptions).next()
  }

  //Update
  //PUT /api/learn_more/:learnMoreId
  async function updateLearnMore({learnMoreId, updatedLearnMore, user_id}) {
    if(updatedLearnMore.images) {
      updatedLearnMore.images.forEach((image, index, self) => {
        self[index] = ObjectID(image)
      })
    }

    if(updatedLearnMore.audio_files) {
      updatedLearnMore.audio_files.forEach((audio, index, self) => {
        self[index] = ObjectID(audio)
      })
    }

    if(updatedLearnMore.videos) {
      updatedLearnMore.videos.forEach((video, index, self) => {
        self[index] = ObjectID(video)
      })
    }

    if(updatedLearnMore.tags) {
      updatedLearnMore.tags.forEach((tag, index, self) => {
        self[index] = ObjectID(tag)
      })
    }
    
    if(updatedLearnMore.categories) {
      updatedLearnMore.categories.forEach((category, index, self) => {
        self[index] = ObjectID(category)
      })
    }

    if(updatedLearnMore.custom_fields) {
      updatedLearnMore.custom_fields.forEach((custom_field, index, self) =>{
        let temp = custom_field
        temp._id = ObjectID(custom_field._id)
        self[index] = temp
      })
    }

    const revision = await createRevision({user_id: user_id})
    
    const learnmore = await learn_more.findOne({_id: ObjectID(learnMoreId)})
    updatedLearnMore.revision_history = learnmore.revision_history
    updatedLearnMore.revision_history.push(ObjectID(revision.ops[0]._id))

    const result = await learn_more.findOneAndUpdate(
      {_id: ObjectID(learnMoreId)},
      {$set: {...updatedLearnMore}}
    )
    return result
  }

  //Delete
  //DELETE /api/learn_more/:learnMoreId
  async function deleteLearnMore({learnMoreId}) {
    const learnMore = await learn_more.findOne({_id: ObjectID(learnMoreId)})
    learnMore.revision_history.forEach(async(revision) => {
      await deleteRevision({revisionId: revision})
    })

    const result = await learn_more.findOneAndDelete({
      _id: ObjectID(learnMoreId)
    })
    return result
  }

  return {
    //User
    createUser,
    getUser,
    updateUser,
    deleteUser,
    //Image
    getImages,
    createImage,
    getImage,
    updateImage,
    deleteImage,
    //Audio
    getAudios,
    createAudio,
    getAudio,
    updateAudio,
    deleteAudio,
    //Video
    getVideos,
    createVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    //Tag
    getTags,
    createTag,
    getTag,
    updateTag,
    deleteTag,
    //Category
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getCategoryGroup,
    //Location
    getLocations,
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation,
    //Revision
    getRevisions,
    createRevision,
    getRevision,
    deleteRevision,
    //Plant
    getPlants,
    createPlant,
    getPlant,
    updatePlant,
    deletePlant,
    //Waypoint
    getWaypoints,
    createWaypoint,
    getWaypoint,
    updateWaypoint,
    deleteWaypoint,
    //Tour
    getTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    //Learn More
    getLearnMores,
    createLearnMore,
    getLearnMore,
    updateLearnMore,
    deleteLearnMore
  }
}
