import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import MediaPickerCtrl from "../../../controllers/Forms/MediaPicker/MediaPickerCtrl";
import ContentPickerCtrl from "../../../controllers/Forms/ContentPicker/ContentPickerCtrl";
import CustomFieldPickerCtrl from "../../../controllers/Forms/CustomFieldPicker/CustomFieldPickerCtrl";
import TextInputCtrl from "../../../controllers/Forms/TextInput/TextInputCtrl";
import TextAreaCtrl from "../../../controllers/Forms/TextArea/TextAreaCtrl";

/*
  @desc UI component for the EditPlant dashboard. Displays form inputs, allows users to update a plant's data.
  @controller ~/src/controllers/Edit/Plant/EditPlantCtrl.js
*/
export default function EditPlant({
  // METHODS
  handleUpdate,
  plantData,
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
        title={
          plantData && plantData.plant_name
            ? `Edit ${plantData.plant_name[0].toUpperCase()}${plantData.plant_name.substr(
                1
              )}`
            : "Edit Plant"
        }
        action="Update"
        method={() => handleUpdate()}
      />
      <div className="form__grid">
        <div className="col">
          <TextInputCtrl
            label={"Plant Name"}
            eValue={plantData.plant_name}
            setter={(data) => plantNameChanged(data)}
          />
          <TextInputCtrl
            label={"Scientific Name"}
            eValue={plantData.scientific_name}
            setter={(data) => scientificNameChanged(data)}
          />
          <CustomFieldPickerCtrl
            label={"Custom Field"}
            selected={plantData.custom_fields}
            setter={(data) => customFieldsChanged(data)}
          />
          <TextAreaCtrl
            label={"Description"}
            eValue={plantData.description}
            setter={(data) => descriptionChanged(data)}
          />
          <TextPickerCtrl
            label={"location"}
            dataLabel={"location"}
            data={eLocations}
            selected={plantData.locations}
            query={queryLocations}
            setter={(data) => locationsChanged(data)}
          />
        </div>
        <div className="col">
          <MediaPickerCtrl
            label={"image"}
            dataLabel={"image"}
            data={eImages}
            query={queryImages}
            selected={plantData.images}
            setter={(data) => imagesChanged(data)}
          />
          <MediaPickerCtrl
            label={"Audio File"}
            dataLabel={"audio_file"}
            data={eAudios}
            query={queryAudios}
            selected={plantData.audio_files}
            setter={(data) => audioFilesChanged(data)}
          />
          <MediaPickerCtrl
            label={"video"}
            dataLabel={"video"}
            data={eVideos}
            query={queryVideos}
            selected={plantData.videos}
            setter={(data) => videosChanged(data)}
          />
        </div>
        <div className="col">
          <TextPickerCtrl
            label={"category"}
            dataLabel={"category"}
            data={eCategories}
            query={queryCategories}
            selected={plantData.categories}
            resource="plant"
            setter={(data) => categoriesChanged(data)}
          />
          <TextPickerCtrl
            label={"tag"}
            dataLabel={"tag"}
            data={eTags}
            selected={plantData.tags}
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
