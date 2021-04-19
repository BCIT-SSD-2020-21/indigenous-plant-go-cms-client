import { custom_field as CustomField } from "./custom_field.ts"
import { video as Video } from "./video.ts"
import { audio_file as AudioFile } from "./audio_file.ts"
import { image as Image } from "./image.ts"
import { tag as Tag } from "./tag.ts"
import { category as Category } from "./category.ts"
import { location as Location } from "./location.ts"
import { revision as Revision } from "./revision.ts"

export interface plant {
  plant_id: ObjectId,
  plant_name: String,
  location: Array<Location>,
  description: String, // Should be stringified HTML
  custom_fields: Array<CustomField>,
  images: Array<Image>,
  audio_files: Array<AudioFile>,
  videos: Array<Video>,
  tags: Array<Tag>,
  categories: Array<Category>,
  revision_history: Array<Revision>,
}