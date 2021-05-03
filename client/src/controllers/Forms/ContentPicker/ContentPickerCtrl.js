import React, { useState, useEffect } from "react";
import ContentPicker from "../../../components/Forms/ContentPicker";

export default function ContentPickerCtrl({ label, dataLabel, data, setter }) {
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);

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

    const filtered = options.filter(
      (option) => !activeOptions.includes(option._id)
    );

    const formatted = filtered.map((option) => {
      return {
        ...option,
        key: option._id,
        value: option._id,
        // Nullify description, it looks like semantic UI drop downs look for this specific key, value which produces unwanted effects.
        description: null,
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
    <ContentPicker
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
