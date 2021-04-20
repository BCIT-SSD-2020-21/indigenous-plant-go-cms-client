import { custom_field as CustomField } from "./custom_field"
import { revision as Revision } from "./revision"

export interface learn_more {
  learn_more_id: ObjectId,
  learn_more_title: String,
  description: String, // Should be stringified HTML
  custom_fields: Array<CustomField>,
  revision_history: Array<Revision>,
}