import { category as Category } from "./category"

export interface waypoint_categories {
  waypoint_categories_id: ObjectId,
  categories: Array<Category>
}