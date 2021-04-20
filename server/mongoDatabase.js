const {MongoClient, ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs')

const url = 'mongodb://localhost:27017'
const dbName = 'indigenousPlant'
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

module.exports = async function() {
  await client.connect()

  const db = client.db(dbName)

  const users = db.collection('users')

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
  async function getTag() {
    return await tag.find().toArray()
  }
  // Get One
  // Get /api/tags/:tagId
  async function getTag({tagId}) {
    return await tags.findOne({_id: ObjectID(tagId)})
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
  return {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getTag,
    getTags,
    getLocation,
    getLocations,
    getRevision,
    getRevisions
  }
}