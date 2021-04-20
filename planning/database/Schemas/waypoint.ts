import { custom_field as CustomField } from "./custom_field"
import { video as Video } from "./video"
import { audio_file as AudioFile } from "./audio_file"
import { image as Image } from "./image"
import { tag as Tag } from "./tag"
import { category as Category } from "./category"
import { location as Location } from "./location"
import { revision as Revision } from "./revision"

export interface waypoint {
  waypoint_id: ObjectId,
  waypoint_name: String,
  location: Location,
  description: String, // Should be stringified HTML
  custom_fields: Array<CustomField>,
  images: Array<Image>,
  audio_files: Array<AudioFile>,
  videos: Array<Video>,
  tags: Array<Tag>,
  categories: Array<Category>,
  revision_history: Array<Revision>,
}