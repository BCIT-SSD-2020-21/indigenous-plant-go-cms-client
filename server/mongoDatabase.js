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
  async function createUser({email, password}) {
    //Check no user with same email
    const user = await users.findOne({
      email: email
    })
    if (user) {
      throw Error("Email already taken")
    }

    //Hash password
    const encrypted = await bcrypt.hash(password, 12)

    const result = await users.insertOne({
      email,
      password: encrypted
    })

    //Need this to make jwt token later
    return result
  }

  //Get One user, use for login
  //Takes in email and password and find one user that match
  //POST /api/users/login
  async function getUser({email, password}) {
    const user = await users.findOne({
      email: email
    })

    if (!user) {
      throw Error("No user with this email")
    }
    const same = await bcrypt.compare(password, user.password)
    if (!same) {
      throw Error("Passwords don't match")
    }

    return user
  }

  //Update One user, should be authorized
  //Update password base on userId
  //PUT /api/users/:userId
  async function updateUser({userId, password}) {
    //Hash password
    const encrypted = await bcrypt.hash(password, 12)

    await users.findOneAndUpdate({
      _id: userId
    },
    {
      password: encrypted
    })
  }

  //Delete One user, should be authorized
  //Delete user base on userId
  //DELETE /api/users/:userId
  async function deleteUser({userId}) {
    await users.findOneAndDelete({
      _id: userId
    })
  }

  return {
    createUser,
    getUser,
    updateUser,
    deleteUser
  }
}