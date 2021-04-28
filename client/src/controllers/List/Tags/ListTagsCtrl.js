import React, { useState, useEffect } from "react";
import ListTags from "../../../components/List/Tags";
import { getTags, createTag, deleteTag, updateTag } from "../../../network";

export default function ListTagsCtrl() {
  const [newTag, setNewTag] = useState("");
  const [eTags, setETags] = useState([]);
  // tags_ is the mutable version of eTags that we'll be using to filter the list
  const [tags_, setTags_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState({});
  const [pendingEdit, setPendingEdit] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [editTag, setEditTag] = useState("");

  useEffect(() => {
    queryTags();
  }, []);

  useEffect(() => {
    setTags_(eTags);
  }, [eTags]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [tags_]);

  const formatPages = () => {
    const dataLength = tags_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      tagsData = tags_;

    // split the data into pages
    const pages = tagsData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
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

  const queryTags = async () => {
    const result = await getTags();
    if (result.error) return console.log("error fetching tags");
    setETags(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setTags_(eTags);
  };

  const batchSelect = () => {
    const resourceIds = eTags.map((tag) => tag._id);
    const selectedIds = selectedTags;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedTags(resourceIds);
    } else {
      setSelectedTags([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedTags];

    if (selectedTags.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedTags(newSelected);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setTags_(eTags);

    let filteredData = eTags.filter((tag) =>
      tag.tag_name.toLowerCase().startsWith(searchQ)
    );
    setTags_(filteredData);
  };

  const submitNewTag = async () => {
    if (!newTag) return console.log("Cannot populate an empty tag");
    const tag = {
      tag_name: newTag,
    };

    const result = await createTag(tag);
    if (result.error) return console.log("error creating a tag");
    queryTags();
    setNewTag("");
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleDelete = async (e) => {
    setModalState("delete");
    const id = e.target.value;
    const foundTag = eTags.filter((tag) => tag._id === id)[0];
    if (!foundTag) return console.log("Unable to find tag");
    await setPendingDelete(foundTag);
    setModalActive(true);
  };

  const applyDelete = async () => {
    const id = pendingDelete._id;
    if (!id) return console.log("Unable to delete category");
    const result = await deleteTag(id);
    if (result.error) return console.log("Unable to delete category");
    closeModal();
    setPendingDelete({});
    queryTags();
  };

  const handleEdit = async (e) => {
    setModalState("edit");
    const id = e.target.value;
    const foundTag = eTags.filter((tag) => tag._id === id)[0];
    if (!foundTag) return console.log("Unable to find tag");
    await setPendingEdit(foundTag);
    setEditTag(foundTag.tag_name);
    setModalActive(true);
  };

  const applyEdit = async (e) => {
    const id = pendingEdit._id;
    if (!id) return console.log("Unable to edit tag");
    const updatedTag = {
      tag_name: editTag,
    };
    const result = await updateTag(id, updatedTag);
    if (result.error) return console.log("Unable to edit tag");
    closeModal();
    setPendingEdit({});
    queryTags();
  };

  return (
    <ListTags
      tags={tags_}
      newTag={setNewTag}
      newTagValue={newTag}
      handleQueryChange={handleQueryChange}
      searchQuery={searchQuery}
      clearSearch={clearSearch}
      selectedTags={selectedTags}
      batchSelect={batchSelect}
      handleSelected={handleSelected}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      applySearch={applySearch}
      submitNewTag={submitNewTag}
      closeModal={closeModal}
      handleDelete={handleDelete}
      modalActive={modalActive}
      modalState={modalState}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      editTag={setEditTag}
      editTagValue={editTag}
      handleEdit={handleEdit}
      applyEdit={applyEdit}
      pendingEdit={pendingEdit}
    />
  );
}
