import React, { useState, useEffect } from "react";
import MediaPicker from "../../../components/Forms/MediaPicker";
import { createImage, createAudio, createVideo } from "../../../network";

export default function MediaPickerCtrl({
  label,
  dataLabel,
  data,
  setter,
  selected,
  query,
}) {
  const [activeSelection, setActiveSelection] = useState([]);
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

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

  const resetFields = () => {
    setCaption("");
    setFile(null);
  };

  const formatSelection = () => {
    if (!selected) return;
    const formatted = selected.map((option) => {
      return {
        _id: option._id,
        url: option[`${dataLabel}_url`],
        title: option.caption,
      };
    });

    setActiveSelection(formatted);
  };

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

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleUpload = async () => {
    let result, formatted, currSelection;
    if (!file || !caption) return console.log("Error uploading file");

    const formData = new FormData();

    switch (dataLabel) {
      case "image":
        formData.append("image", file);
        formData.append("caption", caption);
        result = await createImage(formData);
        break;
      case "audio_file":
        formData.append("audio", file);
        formData.append("caption", caption);
        result = await createAudio(formData);
        break;
      case "video":
        formData.append("video", file);
        formData.append("caption", caption);
        result = await createVideo(formData);
        break;
    }

    if (result.error) return console.log("Error uploading file");
    formatted = {
      _id: result._id,
      url: result[`${dataLabel}_url`],
      title: result.caption,
    };
    currSelection = [...activeSelection, formatted];
    closeModal();
    resetFields();
    setActiveSelection(currSelection);
    query();
  };

  return (
    <MediaPicker
      dataLabel={dataLabel}
      handleSelectChange={handleSelectChange}
      handleRemove={handleRemove}
      confirmSelection={confirmSelection}
      handleOnDragEnd={handleOnDragEnd}
      activeSelection={activeSelection}
      options={formattedOptions}
      label={label}
      openModal={openModal}
      closeModal={closeModal}
      modalActive={modalActive}
      file={file}
      setFile={setFile}
      caption={caption}
      setCaption={setCaption}
      handleUpload={handleUpload}
    />
  );
}
