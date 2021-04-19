export interface user {
  user_id: ObjectId,
  user_name: String,
  password: String, // Encrypted and hashed
  email: String,
  role: String, // [ Admin, Manager ]
}