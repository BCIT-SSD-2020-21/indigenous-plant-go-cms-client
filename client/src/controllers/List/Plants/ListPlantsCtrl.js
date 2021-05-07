import React, { useEffect, useState } from "react";
import ListPlants from "../../../components/List/Plants/index";
import {
  getAllPlants,
  deletePlant,
  getCategoryGroup,
  bulkDeletePlants,
} from "../../../network";

export default function ListPlantsCtrl() {
  let isMounted;
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
  const [modalActive, setModalActive] = useState(false);
  const [pendingDelete, setPendingDelete] = useState({});
  const [modalState, setModalState] = useState("single");
  const [bulkAction, setBulkAction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isMounted = true;
    queryPlants();
    queryCategories();
    formatPages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted) setPlantData_(plantData);
  }, [plantData]);

  useEffect(() => {
    if (!searchQuery && isMounted) applyFilter();
  }, [searchQuery]);

  useEffect(() => {
    if (isMounted) formatCategories();
  }, [eCategories]);

  useEffect(() => {
    if (isMounted) {
      setPage(1);
      formatPages();
    }
  }, [plantData_]);

  const queryPlants = async () => {
    if (!isMounted) return;
    setLoading(true);
    const result = await getAllPlants();
    setLoading(false);
    if (result.error) return;
    if (result.length < 1) setPlantData([]);
    if (!isMounted) return;
    setPlantData(result);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup("plant");
    if (result.error) return;
    if (!isMounted) return;
    setECategories(result);
  };

  const formatPages = () => {
    const dataLength = plantData_.length;
    if (!isMounted) return;
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
    if (!isMounted) return;
    setFormattedCategories(formatted);
  };

  const handleQueryChange = (e) => {
    if (!isMounted) return;
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e, data) => {
    if (!isMounted) return;
    setCategoryFilter(data.value);
  };

  const applyFilter = () => {
    if (!isMounted) return;
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

    if (!isMounted) return;
    setPlantData_(filteredData);
  };

  const clearSearch = () => {
    if (!isMounted) return;
    setSearchQuery("");
  };

  const resetFilters = () => {
    if (!isMounted) return;
    setSearchQuery("");
    setPlantData_(plantData);
    setCategoryFilter("default");
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedPlants];

    if (selectedPlants.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }
    if (!isMounted) return;
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

    if (!isMounted) return;
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
    if (!isMounted) return;
    setPage(currentPage);
  };

  const prevPage = () => {
    let currentPage = page;
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    if (!isMounted) return;
    setPage(currentPage);
  };

  const handleDelete = async (e) => {
    if (!isMounted) return;
    setModalState("single");
    const id = e.target.value;
    const foundPlant = plantData.filter((plant) => plant._id === id)[0];
    if (!foundPlant) return;
    await setPendingDelete(foundPlant);
    setModalActive(true);
  };

  const applyDelete = async () => {
    if (!isMounted) return;
    const id = pendingDelete._id;
    if (!id) return;
    const result = await deletePlant(id);
    if (!isMounted) return;
    if (result.error) return;
    closeModal();
    setPendingDelete({});
    queryPlants();
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedPlants.length < 1) return;
    if (bulkAction === "default") return;
    if (!isMounted) return;
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    const result = await bulkDeletePlants(selectedPlants);
    if (result.error) return;
    if (!isMounted) return;
    closeModal();
    setSelectedPlants([]);
    queryPlants();
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
      loading={loading}
      handleFilterChange={handleFilterChange}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applyFilters={applyFilter}
      resetFilters={resetFilters}
      handleSelected={handleSelected}
      batchSelect={batchSelect}
      prevPage={prevPage}
      nextPage={nextPage}
      closeModal={closeModal}
      handleDelete={handleDelete}
      modalActive={modalActive}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      modalState={modalState}
      handleBulkActionChange={handleBulkActionChange}
      bulkAction={bulkAction}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
    />
  );
}
