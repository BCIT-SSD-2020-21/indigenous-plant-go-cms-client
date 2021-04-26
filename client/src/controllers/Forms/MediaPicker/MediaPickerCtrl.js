import React, { useState, useEffect } from "react";
import MediaPicker from "../../../components/Forms/MediaPicker";

export default function MediaPickerCtrl({ label, dataLabel, data, setter }) {
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(data);
  }, []);

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

    const filtered = options.filter(
      (option) => !activeOptions.includes(option._id)
    );

    const formatted = filtered.map((option) => {
      return {
        ...option,
        key: option._id,
        value: option._id,
        text: option.caption,
      };
    });

    setFormattedOptions(formatted);
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
      title: foundOption.caption,
      url: foundOption[`${dataLabel}_url`],
    };

    const newActiveSelection = [...activeSelection, foundOption];
    setActiveSelection(newActiveSelection);
  };

  const handleRemove = (id) => {
    let selected = [...activeSelection];
    selected = selected.filter((item) => item._id !== id);
    setActiveSelection(selected);
  };
  return (
    <MediaPicker
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
    />
  );
}
