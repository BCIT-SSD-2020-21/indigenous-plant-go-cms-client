import React, { useEffect, useState } from "react";
import ListPlants from "../../../components/List/Plants/index";
import { plants, categories } from "../../../data";

export default function ListPlantsCtrl() {
  const [plantData, setPlantData] = useState(plants);
  // plantData_ is the mutable version of plantData that we'll be using to filter
  const [plantData_, setPlantData_] = useState([]);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlants, setSelectedPlants] = useState([]);

  useEffect(() => {
    setPlantData_(plantData);
  }, []);

  useEffect(() => {
    if (!searchQuery) applyFilter();
  }, [searchQuery]);

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

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {
    // APPLY A CATEGORY FILTER
    const categoryF = categoryFilter.toLowerCase();
    let filteredData = [...plantData].filter((plant) => {
      let plantCategories = plant.categories.map((category) =>
        category.category_name.toLowerCase()
      );

      return plantCategories.includes(categoryF);
    });

    if (categoryF === "default") filteredData = [...plantData];

    // APPLY A SEARCH FILTER
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setPlantData_(filteredData);

    filteredData = filteredData.filter((plant) =>
      plant.plant_name.toLowerCase().startsWith(searchQ)
    );

    setPlantData_(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPlantData_(plantData);
    setCategoryFilter("default");
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedPlants];

    if (selectedPlants.includes(id)) {
      console.log("id is inside, remove it");
      newSelected = newSelected.filter((item) => item !== id);
      console.log(newSelected);
    } else {
      console.log("id is NOT inside, add it");
      newSelected = [...newSelected, id];
    }

    setSelectedPlants(newSelected);
  };

  return (
    <ListPlants
      plantData={plantData_}
      categories={formattedCategories}
      searchQuery={searchQuery}
      categoryFilter={categoryFilter}
      selectedPlants={selectedPlants}
      handleFilterChange={handleFilterChange}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applyFilters={applyFilter}
      resetFilters={resetFilters}
      handleSelected={handleSelected}
    />
  );
}
