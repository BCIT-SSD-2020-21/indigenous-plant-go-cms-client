import React, { useState, useEffect } from "react";
import AddPlants from "../../../components/Add/Plants";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  createPlant,
} from "../../../network";

export default function AddPlantsCtrl() {
  const history = useHistory();
  // ===============================================================
  // FORM DATA
  // @desc state variables that map back to what the user has selected.
  //        These variables are updated when the user changes any form
  //        controls for a plant.
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
  // @desc state variables that hold EXISTING data. These variables
  //        allow the user to see what is currently in the DB, and select
  //        from that existing data. We immediately query for these on mount.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eTags, setETags] = useState([]);
  const [eCategories, setECategories] = useState([]);

  useEffect(async () => {
    await queryLocations();
    await queryImages();
    await queryAudios();
    await queryVideos();
    await queryTags();
    await queryCategories();
  }, []);

  // ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
  // @desc queries locations, media, categories, and tags to display
  //       available options when creating a plant.
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

  const queryTags = async () => {
    const result = await getTags();
    if (result.error) return console.log("error getting tags");
    setETags(result);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup("plant");
    if (result.error) return console.log("error getting categories");
    setECategories(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch for state updates in child components.
  //        These functions are used as setters, and when a form-control
  //        is updated, these functions update this component's state to match.
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

  // ===============================================================
  // POST
  // @desc Publishes the new Plant.
  // ===============================================================

  const handlePublish = async () => {
    const plant = {
      plant_name: plantName,
      scientific_name: scientificName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      locations: locations,
      custom_fields: customFields,
    };

    const result = await createPlant(plant);
    if (result.error) return console.log("error creating plant");
    history.push("/plants");
  };

  return (
    <AddPlants
      // WATCHERS
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
      eTags={eTags}
      eCategories={eCategories}
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryTags={queryTags}
      queryCategories={queryCategories}
    />
  );
}
