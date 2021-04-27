import React, { useState, useEffect } from "react";
import ListCategories from "../../../components/List/Categories";
import { getCategoryGroup, createCategory } from "../../../network";

export default function ListCategoriesCtrl({ dataLabel, label, labelPlural }) {
  const [eCategories, setECategories] = useState([]);
  // categories_ is the mutable version of eCategories that we'll be using to filter
  const [categories_, setCategories_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCat, setNewCat] = useState("");

  useEffect(() => {
    queryCategories();
  }, []);

  useEffect(() => {
    setCategories_(eCategories);
  }, [eCategories]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [categories_]);

  const formatPages = () => {
    const dataLength = categories_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      categoriesData = categories_;

    // split the data into pages
    const pages = categoriesData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup(dataLabel);
    if (result.error) return console.log("error fetching categories");
    setECategories(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setCategories_(eCategories);

    let filteredData = eCategories.filter((category) =>
      category.category_name.toLowerCase().startsWith(searchQ)
    );
    setCategories_(filteredData);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCategories_(eCategories);
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

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedCategories];

    if (selectedCategories.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedCategories(newSelected);
  };

  const batchSelect = () => {
    const resourceIds = eCategories.map((category) => category._id);
    const selectedIds = selectedCategories;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedCategories(resourceIds);
    } else {
      setSelectedCategories([]);
    }
  };

  const submitNewCategory = async () => {
    if (!newCat) return console.log("Cannot populate an empty category");
    const category = {
      category_name: newCat,
      resource: `${dataLabel}`,
    };

    const result = await createCategory(category);
    if (result.error) return console.log("error creating a category");
    queryCategories();
    setNewCat("");
  };

  return (
    <ListCategories
      dataLabel={dataLabel}
      categories={categories_}
      label={label}
      labelPlural={labelPlural}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
      applySearch={applySearch}
      clearSearch={clearSearch}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      handleSelected={handleSelected}
      batchSelect={batchSelect}
      newCategory={setNewCat}
      newCategoryValue={newCat}
      selectedCategories={selectedCategories}
      submitNewCategory={submitNewCategory}
    />
  );
}
