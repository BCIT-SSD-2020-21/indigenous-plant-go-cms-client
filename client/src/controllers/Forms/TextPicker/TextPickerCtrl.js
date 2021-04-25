import React, { useState, useEffect } from "react";
import TextPicker from "../../../components/Forms/TextPicker";
import { locations } from "./Fake";

export default function TextPickerCtrl() {
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(locations);
  }, []);

  useEffect(() => {
    formatOptions();
  }, [options, activeSelection]);

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
        text: option.location_name,
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
      title: foundOption.location_name,
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
      activeSelection={activeSelection}
      options={formattedOptions}
    />
  );
}
