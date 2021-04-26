import React, { useState, useEffect } from "react";
import AddPlants from "../../../components/Add/Plants";

export default function AddPlantsCtrl() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);

  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };

  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setTags(mappedData);
  };

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setLocations(mappedData);
  };

  const imagesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setImages(mappedData);
  };

  const audioFilesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setAudioFiles(mappedData);
  };

  const videosChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setVideos(mappedData);
  };

  const handlePublish = () => {
    console.log("Attempt publish");
  };

  return (
    <AddPlants
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      videosChanged={videosChanged}
      handlePublish={handlePublish}
    />
  );
}
