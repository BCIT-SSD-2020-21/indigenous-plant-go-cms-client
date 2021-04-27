import React, { useEffect, useState } from "react";
import ListPlants from "../../../components/List/Plants/index";
import { plants, categories } from "../../../data";

export default function ListPlantsCtrl() {
  const [plantData, setPlantData] = useState(plants);
  // plantData_ is the mutable version of plantData that we'll be using to filter
  const [plantData_, setPlantData_] = useState([]);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    setPlantData_(plantData);
  }, []);

  useEffect(() => {
    formatCategories();
  }, [categories]);

  const formatCategories = () => {
    const formatted = categories.map((category) => {
      return {
        ...category,
        key: category._id,
        value: category.category_name,
        text: category.category_name,
      };
    });

    setFormattedCategories(formatted);
  };

  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {
    const categoryF = categoryFilter.toLowerCase();
    if (categoryF === "default") return setPlantData_(plantData);

    const filteredData = [...plantData].filter((plant) => {
      let plantCategories = plant.categories.map((category) =>
        category.category_name.toLowerCase()
      );

      return plantCategories.includes(categoryF);
    });

    setPlantData_(filteredData);
  };

  return (
    <ListPlants
      plantData={plantData_}
      categories={formattedCategories}
      handleFilterChange={handleFilterChange}
      applyFilter={applyFilter}
    />
  );
}
