import React, { useState, useEffect } from "react";
import CustomFieldPicker from "../../../components/Forms/CustomFieldPicker";
import { v4 as uuidv4 } from "uuid";

export default function CustomFieldPickerCtrl({ label }) {
  const [activeSelection, setActiveSelection] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [_id, setId] = useState("");
  const [modalState, setModalState] = useState("add");

  const clearFields = () => {
    setTitle("");
    setContent("");
    setId("");
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const addToSelection = () => {
    if (!title || !content)
      return console.log("Cannot create empty custom field");
    const field = {
      _id: uuidv4(),
      title: title,
      content: content,
    };

    let selection = [...activeSelection, field];
    setActiveSelection(selection);
    setModalActive(false);
    clearFields();
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activeSelection);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setActiveSelection(items);
  };

  const handleRemove = (id) => {
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id !== id);
    setActiveSelection(selected);
  };

  const handleEdit = (id) => {
    setModalState("edit");
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id === id)[0];
    if (!selected) return console.log("error editing a custom field");
    setId(selected._id);
    setTitle(selected.title);
    setContent(selected.content);
    setModalActive(true);
  };

  const handleNewCustomField = () => {
    clearFields();
    setModalState("add");
    setModalActive(true);
  };

  const submitEdit = () => {
    let selected = [...activeSelection];
    if (!_id) return console.log("error editing a custom field");

    let selectedIndex = selected.map((item) => item._id).indexOf(`${_id}`);
    if (selectedIndex === null || selectedIndex === undefined)
      return console.log("error finding existing index");

    const updatedField = {
      _id: _id,
      title: title,
      content: content,
    };

    selected[selectedIndex] = updatedField;

    setActiveSelection(selected);
    clearFields();
    setModalActive(false);
  };

  return (
    <CustomFieldPicker
      handleRemove={handleRemove}
      handleEdit={handleEdit}
      submitEdit={submitEdit}
      handleOnDragEnd={handleOnDragEnd}
      handleNewCustomField={handleNewCustomField}
      updateTitle={updateTitle}
      updateContent={updateContent}
      closeModal={closeModal}
      addToSelection={addToSelection}
      activeSelection={activeSelection}
      modalActive={modalActive}
      modalState={modalState}
      label={label}
      title={title}
      content={content}
    />
  );
}
