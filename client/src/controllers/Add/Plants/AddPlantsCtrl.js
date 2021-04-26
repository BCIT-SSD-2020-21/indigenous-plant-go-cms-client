import React from "react";
import AddPlants from "../../../components/Add/Plants";

export default function AddPlantsCtrl() {
  const handlePublish = () => {
    console.log("Attempt publish");
  };
  return <AddPlants handlePublish={handlePublish} />;
}
