export interface custom_field {
  custom_field_id: ObjectId,
  field_title: String,
  content: String, // This should be stringified HTML
}