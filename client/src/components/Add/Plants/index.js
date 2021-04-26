import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import { locations, categories, tags } from "../../../data";

export default function AddPlants({
  handlePublish,
  categoriesChanged,
  tagsChanged,
  locationsChanged,
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
    </div>
  );
}
