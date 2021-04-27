import React, { useState, useEffect } from "react";
import TextPicker from "../../../components/Forms/TextPicker";

export default function TextPickerCtrl({ label, dataLabel, data, setter }) {
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState(data);

  useEffect(() => {
    setOptions(data);
    formatOptions();
  }, [data]);

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

  return (
    <TextPicker
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
