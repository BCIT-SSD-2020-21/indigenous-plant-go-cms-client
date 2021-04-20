export interface location {
  location_id: ObjectId,
  location_name: String,
  coordinates: String, // Need to confirm the requirements for this attribute
  description: String // Nullable
}