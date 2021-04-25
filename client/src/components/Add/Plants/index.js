import React from "react";
import DashHeader from "../../DashHeader";

export default function AddPlants({ handlePublish }) {
  return (
    <div>
      <DashHeader
        title="Add New Plant"
        action="Publish"
        method={handlePublish}
      />
    </div>
  );
}
