import React, { useState, useEffect } from "react";
import AddPlants from "../../../components/Add/Plants";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
} from "../../../network";

export default function AddPlantsCtrl() {
  // ===============================================================
  // FORM DATA
  // ===============================================================
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  // ===============================================================
  // SELECTION DATA
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);

  useEffect(async () => {
    await queryLocations();
    await queryImages();
    await queryAudios();
    await queryVideos();
  }, []);

  // ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
  // ===============================================================
  const queryLocations = async () => {
    const result = await getLocations();
    if (result.error) return console.log("error getting locations");
    setELocations(result);
  };

  const queryImages = async () => {
    const result = await getImages();
    if (result.error) return console.log("error getting images");
    setEImages(result);
  };

  const queryAudios = async () => {
    const result = await getAudios();
    if (result.error) return console.log("error getting audios");
    setEAudios(result);
  };

  const queryVideos = async () => {
    const result = await getVideos();
    if (result.error) return console.log("error getting videos");
    setEVideos(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // ===============================================================

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

  const customFieldsChanged = (data) => {
    setCustomFields(data);
  };

  const plantNameChanged = (data) => {
    setPlantName(data);
  };

  const scientificNameChanged = (data) => {
    setScientificName(data);
  };

  const descriptionChanged = (data) => {
    setDescription(data);
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
      customFieldsChanged={customFieldsChanged}
      videosChanged={videosChanged}
      plantNameChanged={plantNameChanged}
      scientificNameChanged={scientificNameChanged}
      descriptionChanged={descriptionChanged}
      handlePublish={handlePublish}
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
    />
  );
}
