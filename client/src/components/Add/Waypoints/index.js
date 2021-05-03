import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";

/*
  @desc UI component for the AddWaypoints dashboard. Displays form inputs.
  @controller ~/src/controllers/Add/Waypoints/AddWaypointsCtrl.js
*/
export default function AddWaypoints({
  // METHODS
  handlePublish,
  waypointNameChanged,
  descriptionChanged,
  locationsChanged,
  customFieldsChanged,
  imagesChanged,
  audioFilesChanged,
  videosChanged,
  categoriesChanged,
  tagsChanged,
  plantsChanged,
  // SELECTION DATA
  eLocations,
  eImages,
  eAudios,
  eVideos,
  eTags,
  eCategories,
  ePlants,
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
        title="Add New Waypoint"
        action="Publish"
        method={handlePublish}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Waypoint Name"}
            setter={(data) => waypointNameChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            setter={(data) => descriptionChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            setter={(data) => customFieldsChanged(data)}
          />
          <TextPickerCtrl
            label={"location"}
            dataLabel={"location"}
            data={eLocations}
            query={queryLocations}
            setter={(data) => locationsChanged(data)}
          />
          <ContentPickerCtrl
            label={"plant"}
            dataLabel={"plant"}
            data={ePlants}
            setter={(data) => plantsChanged(data)}
          />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            setter={(data) => imagesChanged(data)}
          />
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            setter={(data) => audioFilesChanged(data)}
          />
          <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            query={queryVideos}
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
      </div>
    </div>
  );
}
