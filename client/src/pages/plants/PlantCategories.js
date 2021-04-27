import React from "react";
import ListCategoriesCtrl from "../../controllers/List/Categories/ListCategoriesCtrl";

export default function PlantCategories() {
  return (
    <main>
      <ListCategoriesCtrl
        dataLabel={"plants"}
        label={"Plant"}
        labelPlural={"Plants"}
      />
    </main>
  );
}
