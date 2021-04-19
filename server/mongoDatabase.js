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
  // Takes in email and password
  // POST /api/users
  async function createUser({email, username, password}) {
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
  //Takes in email and password and find one user that match
  //POST /api/users/login
  async function getUser({loginName, password}) {
    const user = await users.find({
      $or: [{email: loginName}, {username: loginName}]
    })

    if (!(await user.hasNext())) {
      throw Error("Invalid user")
    }

    while (await user.hasNext()) {
      const checkUser = await user.next()
      const same = await bcrypt.compare(password, checkUser.password)
      if (same) {
        return checkUser
      }
    }

    throw Error("Password doesn't match")
  }

  //Update One user, should be authorized
  //Update password base on userId
  //PUT /api/users/:userId
  async function updateUser({userId, updatedUser}) {
    if (updatedUser.password) {
      //Hash password
      const encrypted = await bcrypt.hash(updatedUser.password, 12)
      updatedUser.password = encrypted
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

  return {
    createUser,
    getUser,
    updateUser,
    deleteUser
  }
}