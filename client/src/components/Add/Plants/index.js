import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import {
  locations,
  categories,
  tags,
  images,
  audio,
  videos,
  plants,
  waypoints,
} from "../../../data";

export default function AddPlants({
  handlePublish,
  categoriesChanged,
  tagsChanged,
  locationsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,
}) {
  return (
    <div>
      <DashHeader
        title="Add New Plant"
        action="Publish"
        method={handlePublish}
      />
      <TextPickerCtrl
        label={"location"}
        dataLabel={"location"}
        data={locations}
        setter={(data) => locationsChanged(data)}
      />
      <TextPickerCtrl
        label={"category"}
        dataLabel={"category"}
        data={categories}
        setter={(data) => categoriesChanged(data)}
      />
      <TextPickerCtrl
        label={"tag"}
        dataLabel={"tag"}
        data={tags}
        setter={(data) => tagsChanged(data)}
      />
      <MediaPickerCtrl
        label={"image"}
        dataLabel={"image"}
        data={images}
        setter={(data) => imagesChanged(data)}
      />
      <MediaPickerCtrl
        label={"Audio File"}
        dataLabel={"audio_file"}
        data={audio}
        setter={(data) => audioFilesChanged(data)}
      />
      <MediaPickerCtrl
        label={"video"}
        dataLabel={"video"}
        data={videos}
        setter={(data) => videosChanged(data)}
      />
      <ContentPickerCtrl
        label={"plant"}
        dataLabel={"plant"}
        data={plants}
        setter={(data) => videosChanged(data)}
      />

      <ContentPickerCtrl
        label={"waypoint"}
        dataLabel={"waypoint"}
        data={waypoints}
        setter={(data) => videosChanged(data)}
      />
      <CustomFieldPickerCtrl
        label={"Custom Field"}
        setter={(data) => videosChanged(data)}
      />
    </div>
  );
}
