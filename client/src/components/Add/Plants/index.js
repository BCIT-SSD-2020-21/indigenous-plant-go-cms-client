import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";

export default function AddPlants({
  handlePublish,
  categoriesChanged,
  tagsChanged,
  locationsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,
  customFieldsChanged,
  plantNameChanged,
  scientificNameChanged,
  descriptionChanged,
  // SELECTION DATA
  eLocations,
  eImages,
  eAudios,
  eVideos,
  eTags,
  eCategories,
  // QUERIES
  queryLocations,
  queryImages,
  queryAudios,
  queryVideos,
  queryTags,
  queryCategories,
}) {
  return (
    <div>
      <DashHeader
        title="Add New Plant"
        action="Publish"
        method={handlePublish}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Plant Name"}
            setter={(data) => plantNameChanged(data)}
          />
          <TextInputCtrl
            label={"Scientific Name"}
            setter={(data) => scientificNameChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            setter={(data) => customFieldsChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            setter={(data) => descriptionChanged(data)}
          />
          <TextPickerCtrl
            label={"location"}
            dataLabel={"location"}
            data={eLocations}
            query={queryLocations}
            setter={(data) => locationsChanged(data)}
          />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            setter={(data) => imagesChanged(data)}
          />
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            setter={(data) => audioFilesChanged(data)}
          />
          <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            setter={(data) => videosChanged(data)}
          />
        </div>
        <div className="col">
          <TextPickerCtrl
            label={"category"}
            dataLabel={"category"}
            data={eCategories}
            query={queryCategories}
            resource="plant"
            setter={(data) => categoriesChanged(data)}
          />
          <TextPickerCtrl
            label={"tag"}
            dataLabel={"tag"}
            data={eTags}
            query={queryTags}
            setter={(data) => tagsChanged(data)}
          />
        </div>
        {/* <ContentPickerCtrl
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
      /> */}
      </div>
    </div>
  );
}
