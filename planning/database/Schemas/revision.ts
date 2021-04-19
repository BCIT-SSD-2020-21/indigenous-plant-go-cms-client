import { user as User } from "./user.ts"

export interface revision {
  revision_id: ObjectId,
  user: User,
  date: Date
}