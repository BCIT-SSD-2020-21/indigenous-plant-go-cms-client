import React from "react";
import ListPlants from "../../../components/List/Plants/index";
import { plants } from "../../../data";

export default function ListPlantsCtrl() {
  return <ListPlants plantData={plants} />;
}
