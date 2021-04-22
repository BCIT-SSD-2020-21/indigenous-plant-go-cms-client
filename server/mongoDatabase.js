const {MongoClient, ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs')

const url = 'mongodb://localhost:27017'
const dbName = 'indigenousPlant'
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

module.exports = async function() {
  await client.connect()

  const db = client.db(dbName)

  const users = db.collection('users')
  const tags = db.collection('tags')
  const categories = db.collection('categories')
  const locations = db.collection('locations')
  const revisions = db.collection('revisions')

  // Users

  // Create new user, use for register
  // Takes in email, username and password, role default to Manager
  // POST /api/users
  async function createUser({email, username, password}) {
    //Check if email or username is repeating
    const user = await users.findOne({
      $or: [{email: email}, {username: username}]
    })
    if (user) {
      throw Error("Username or email is already taken")
    }

    //Hash password
    const encrypted = await bcrypt.hash(password, 12)

    const result = await users.insertOne({
      email,
      username,
      password: encrypted,
      role: "Manager"
    })

    //Need this to make jwt token later
    return result
  }

  //Get One user, use for login
  //Takes in email/username and password and find one user that match
  //POST /api/users/login
  async function getUser({loginName, password}) {
    const user = await users.findOne({
      $or: [{email: loginName}, {username: loginName}]
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
    if (updatedUser.email || updatedUser.username) {
      const user = await users.findOne({
        $or: [{email: updatedUser.email}, {username: updatedUser.username}]
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

  // CRUD for Tag
  
  // Get All
  //GET /api/tags
  async function getTags() {
    return await tags.find().toArray()
  }
  // Get One
  // Get /api/tags/:tagId
  async function getTag({tagId}) {
    return await tags.findOne({_id: ObjectID(tagId)})
  }
  //Create Tag
  async function createTag({tagName}) {
    const result = await tags.insertOne({
      tag_name: tagName
    })
    return result
  }
  //Update Tag
  //PUT /api/tags/:tagId
  async function updateTag({tagId, updatedTag}) {
    const result = await tags.findOneAndUpdate(
      {_id: ObjectID(tagId)},
      {$set: {...updatedTag}}
    )
    return result
  }
  //Delete tag base on tagId
  //DELETE /api/tags/:tagId
  async function deleteTag({tagId}) {
    const result = await tags.findOneAndDelete({
      _id: ObjectID(tagId)
    })
    return result
  }

  // Category 

  // Get All
  //GET /api/categories
  async function getCategories() {
    return await categories.find().toArray()
  }

  // Get One
  //GET /api/categories
  async function getCategory({categoryId}) {
    return await categories.findOne({_id: ObjectID(categoryId)})
  }

  //Create Category
  async function createCategory({categoryName}) {
    const result = await categories.insertOne({
      category_name: categoryName
    })
    return result
  }

  //Update Category
  //PUT /api/categories/:categoryId
  async function updateCategory({categoryId, updatedCategory}) {
    const result = await categories.findOneAndUpdate(
      {_id: ObjectID(categoryId)},
      {$set: {...updatedCategory}}
    )
    return result
  }
  
  //Delete tag base on categoryId
  //DELETE /api/categories/:categoryId
  async function deleteCategory({categoryId}) {
    const result = await categories.findOneAndDelete({
      _id: ObjectID(categoryId)
    })
    return result
  }

  // Location
  
  // Get All
  //GET /api/locations
  async function getLocations() {
    return await locations.find().toArray()
  }

  // Get One
  //GET /api/locations
  async function getLocation({locationId}) {
    return await locations.findOne({_id: ObjectID(locationId)})
  }

  //Create Locations
  async function createLocation({locationName}) {
    const result = await locations.insertOne({
      location_name: locationName
    })
    return result
  }

  //Update Location
  //PUT /api/locations/:locationId
  async function updateLocation({locationId, updatedLocation}) {
    const result = await locations.findOneAndUpdate(
      {_id: ObjectID(locationId)},
      {$set: {...updatedLocation}}
    )
    return result
  }
  
  //Delete locations base on locationId
  //DELETE /api/locations/:locationId
  async function deleteLocation({locationId}) {
    const result = await locations.findOneAndDelete({
      _id: ObjectID(locationId)
    })
    return result
  }

  // Revision
  
  // Get All
  //GET /api/revisions
  async function getRevisions() {
    return await revisions.find().toArray()
  }

  // Get One
  //GET /api/revisions
  async function getRevision({revisionId}) {
    return await revisions.findOne({_id: ObjectID(revisionId)})
  }

  //Create Revision
  async function createRevision({revisionName}) {
    const result = await revisions.insertOne({
      revision_name: revisionName
    })
    return result
  }

  //Update Revision
  //PUT /api/revisions/:revisionId
  async function updateRevision({revisionId, updatedRevision}) {
    const result = await revisions.findOneAndUpdate(
      {_id: ObjectID(revisionId)},
      {$set: {...updatedRevision}}
    )
    return result
  }
  
  //Delete Revisions base on revisionId
  //DELETE /api/revisions/:revisionId
  async function deleteRevision({revisionId}) {
    const result = await revisions.findOneAndDelete({
      _id: ObjectID(revisionId)
    })
    return result
  }
  return {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    //Tag
    createTag,
    updateTag,
    deleteTag,
    getTag,
    getTags,
    //Category
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    //Location
    getLocation,
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    //Revision
    getRevision,
    getRevisions,
    createRevision,
    updateRevision,
    deleteRevision
  }
  }
