import React, { useState, useEffect } from "react";
import ListCategories from "../../../components/List/Categories";
import { getAllCategories } from "../../../network";

export default function ListCategoriesCtrl({ dataLabel, label, labelPlural }) {
  const [eCategories, setECategories] = useState([]);

  useEffect(() => {
    queryCategories();
  }, []);

  const queryCategories = async () => {
    const result = await getAllCategories();
    if (result.error) return console.log("error fetching categories");
    setECategories(result);
  };

  return (
    <ListCategories
      dataLabel={dataLabel}
      categories={eCategories}
      label={label}
      labelPlural={labelPlural}
    />
  );
}
