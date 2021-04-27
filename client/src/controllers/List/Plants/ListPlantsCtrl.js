import React, { useEffect, useState } from "react";
import ListPlants from "../../../components/List/Plants/index";
import { getAllPlants, getAllCategories } from "../../../network";

export default function ListPlantsCtrl() {
  const [plantData, setPlantData] = useState([]);
  // plantData_ is the mutable version of plantData that we'll be using to filter
  const [plantData_, setPlantData_] = useState([]);
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [eCategories, setECategories] = useState([]);

  useEffect(() => {
    queryPlants();
    queryCategories();
    formatPages();
  }, []);

  useEffect(() => {
    setPlantData_(plantData);
  }, [plantData]);

  useEffect(() => {
    if (!searchQuery) applyFilter();
  }, [searchQuery]);

  useEffect(() => {
    formatCategories();
  }, [eCategories]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [plantData_]);

  const queryPlants = async () => {
    const result = await getAllPlants();
    if (result.error) return console.log("error getting plants");
    setPlantData(result);
  };

  const queryCategories = async () => {
    const result = await getAllCategories();
    if (result.error) return console.log("error getting categories");
    setECategories(result);
  };

  const formatPages = () => {
    const dataLength = plantData_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      plantData = plantData_;

    // split the data into pages
    const pages = plantData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const formatCategories = () => {
    const formatted = eCategories.map((category) => {
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

  const batchSelect = () => {
    const resourceIds = plantData.map((plant) => plant._id);
    const selectedIds = selectedPlants;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedPlants(resourceIds);
    } else {
      setSelectedPlants([]);
    }
  };

  const nextPage = () => {
    let currentPage = page;
    if (currentPage >= pages.length) return;

    currentPage = currentPage + 1;
    setPage(currentPage);
  };

  const prevPage = () => {
    let currentPage = page;
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    setPage(currentPage);
  };

  return (
    <ListPlants
      plantData={plantData_}
      categories={formattedCategories}
      searchQuery={searchQuery}
      categoryFilter={categoryFilter}
      selectedPlants={selectedPlants}
      hasPages={hasPages}
      pages={pages}
      page={page}
      handleFilterChange={handleFilterChange}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applyFilters={applyFilter}
      resetFilters={resetFilters}
      handleSelected={handleSelected}
      batchSelect={batchSelect}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  );
}
