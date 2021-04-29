import React, { useState, useEffect } from "react";
import TextPicker from "../../../components/Forms/TextPicker";
import { createTag, createCategory, createLocation } from "../../../network";

export default function TextPickerCtrl({
  label,
  dataLabel,
  data,
  selected,
  setter,
  query,
  resource,
}) {
  const fieldInputs = {
    location: {
      name: "",
      latitude: 0,
      longitude: 0,
      description: "",
    },
    category: {
      name: "",
    },
    tag: {
      name: "",
    },
  };
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState(data);
  const [modalActive, setModalActive] = useState(false);
  const [fields, setFields] = useState(fieldInputs);

  useEffect(() => {
    setOptions(data);
    formatOptions();
  }, [data]);

  useEffect(() => {
    formatSelection();
  }, [selected]);

  useEffect(() => {
    setter(activeSelection);
  }, [activeSelection]);

  useEffect(() => {
    formatOptions();
  }, [options, activeSelection]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activeSelection);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setActiveSelection(items);
  };

  const formatOptions = () => {
    const activeOptions = [...activeSelection].map((item) => item._id);

    const filtered = data.filter(
      (option) => !activeOptions.includes(option._id)
    );

    const formatted = filtered.map((option) => {
      return {
        ...option,
        description: null,
        key: option._id,
        value: option._id,
        text: option[`${dataLabel}_name`],
      };
    });

    setFormattedOptions(formatted);
  };

  const formatSelection = () => {
    if (!selected) return console.log("Error formatting selection");
    const formatted = selected.map((option) => {
      return {
        _id: option._id,
        title: option[`${dataLabel}_name`],
      };
    });

    setActiveSelection(formatted);
  };

  const handleSelectChange = (e, data) => {
    setSelectedOption(data.value);
  };

  const confirmSelection = () => {
    let foundOption = options.filter(
      (option) => option._id === selectedOption
    )[0];

    if (!foundOption || foundOption.length < 1)
      return console.log("Error selecting option");

    foundOption = {
      _id: foundOption._id,
      title: foundOption[`${dataLabel}_name`],
    };

    const newActiveSelection = [...activeSelection, foundOption];
    setActiveSelection(newActiveSelection);
  };

  const handleRemove = (id) => {
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id !== id);
    setActiveSelection(selected);
  };

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleFieldChange = (e, label_) => {
    let target = e.target.name,
      fieldLabel = label_,
      value = e.target.value;

    let currentFields = { ...fields };
    currentFields[`${fieldLabel}`][`${target}`] = value;

    setFields(currentFields);
  };

  const handleFieldUpload = async (label_) => {
    let fieldLabel = label_;
    let result, currSelection, formatted;

    switch (fieldLabel) {
      case "tag":
        if (!fields.tag.name) return console.log("Error uploading tag");
        const tag = {
          tag_name: fields.tag.name,
        };
        result = await createTag(tag);
        break;
      case "category":
        if (!fields.category.name)
          return console.log("Error uploading category");
        const category = {
          category_name: fields.category.name,
          resource: resource,
        };
        result = await createCategory(category);
        break;
      case "location":
        if (
          !fields.location.name ||
          !fields.location.longitude ||
          !fields.location.latitude
        )
          return console.log("Error uploading location");
        const location = {
          location_name: fields.location.name,
          latitude: fields.location.latitude,
          longitude: fields.location.longitude,
          description: fields.location.description,
        };
        result = await createLocation(location);
        break;
    }
    if (result.error) return console.log("Error uploading tag");
    formatted = {
      _id: result._id,
      title: result[`${dataLabel}_name`],
    };
    currSelection = [...activeSelection, formatted];
    closeModal();
    setFields(fieldInputs);
    setActiveSelection(currSelection);
    query();
  };

  return (
    <TextPicker
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
      dataLabel={dataLabel}
      modalActive={modalActive}
      openModal={openModal}
      closeModal={closeModal}
      fields={fields}
      handleFieldChange={handleFieldChange}
      handleFieldUpload={handleFieldUpload}
    />
  );
}
