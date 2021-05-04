import React, { useState, useEffect } from "react";
import ListLocations from "../../../components/List/Locations";
import {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  bulkDeleteLocations,
} from "../../../network";

export default function ListLocationsCtrl() {
  const locationFields = {
    name: "",
    latitude: 0,
    longitude: 0,
    description: "",
  };
  const [newLocation, setNewLocation] = useState(locationFields);
  const [eLocations, setELocations] = useState([]);
  // locations_ is the mutable version of eLocations that we'll be using to filter the list
  const [locations_, setLocations_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [pendingDelete, setPendingDelete] = useState({});
  const [pendingEdit, setPendingEdit] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [editLocation, setEditLocation] = useState(locationFields);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [bulkAction, setBulkAction] = useState("");

  useEffect(() => {
    queryLocations();
  }, []);

  useEffect(() => {
    setLocations_(eLocations);
  }, [eLocations]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [locations_]);

  const formatPages = () => {
    const dataLength = locations_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      locationsData = locations_;

    // split the data into pages
    const pages = locationsData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const nextPage = () => {
    let currentPage = page;
    if (currentPage >= pages.length) return;

    currentPage = currentPage + 1;
    setPage(currentPage);
  };

  const prevPage = () => {
    let currentPage = page;
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    setPage(currentPage);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setLocations_(eLocations);
  };

  const queryLocations = async () => {
    const result = await getLocations();
    if (result.error) return console.log("error fetching locations");
    setELocations(result);
  };

  const handleNewLocation = (e) => {
    let target = e.target.name,
      value = e.target.value;

    let currentFields = { ...newLocation };
    currentFields[`${target}`] = value;
    setNewLocation(currentFields);
  };

  const handleChangeLocation = (e) => {
    let target = e.target.name,
      value = e.target.value;

    let currentFields = { ...editLocation };
    currentFields[`${target}`] = value;
    setEditLocation(currentFields);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setLocations_(eLocations);

    let filteredData = eLocations.filter((location) =>
      location.location_name.toLowerCase().startsWith(searchQ)
    );
    setLocations_(filteredData);
  };

  const batchSelect = () => {
    const resourceIds = eLocations.map((tag) => tag._id);
    const selectedIds = selectedLocations;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedLocations(resourceIds);
    } else {
      setSelectedLocations([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedLocations];

    if (selectedLocations.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedLocations(newSelected);
  };

  const submitNewLocation = async () => {
    const isUndefined = (variable) => variable === undefined;
    if (Object.values(newLocation).some(isUndefined))
      return console.log("New location fields are missing.");

    const newLocation_ = {
      location_name: newLocation.name,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      description: newLocation.description,
    };

    const result = await createLocation(newLocation_);
    if (result.error) return console.log("error creating a location");
    queryLocations();
    setNewLocation(locationFields);
  };

  const handleDelete = async (e) => {
    setModalState("delete");
    const id = e.target.value;
    const foundLocation = eLocations.filter((tag) => tag._id === id)[0];
    if (!foundLocation) return console.log("Unable to find location");
    await setPendingDelete(foundLocation);
    setModalActive(true);
  };

  const applyDelete = async () => {
    const id = pendingDelete._id;
    if (!id) return console.log("Unable to delete category");
    const result = await deleteLocation(id);
    if (result.error) return console.log("Unable to delete category");
    closeModal();
    setPendingDelete({});
    queryLocations();
  };

  const handleEdit = async (e) => {
    setModalState("edit");
    const id = e.target.value;
    const foundLocation = eLocations.filter(
      (location) => location._id === id
    )[0];
    if (!foundLocation) return console.log("Unable to find location");
    await setPendingEdit(foundLocation);

    const L = {
      name: foundLocation.location_name,
      latitude: foundLocation.latitude,
      longitude: foundLocation.longitude,
      description: foundLocation.description,
    };

    setEditLocation(L);
    setModalActive(true);
  };

  const applyEdit = async (e) => {
    const id = pendingEdit._id;
    if (!id) return console.log("Unable to edit location");
    const updatedLocation = {
      location_name: editLocation.name,
      latitude: editLocation.latitude,
      longitude: editLocation.longitude,
      description: editLocation.description,
    };
    const result = await updateLocation(id, updatedLocation);
    if (result.error) return console.log("Unable to edit location");
    closeModal();
    setPendingEdit({});
    queryLocations();
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    console.log(data.value);
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedLocations.length < 1)
      return console.log("no locations selected");
    if (bulkAction === "default")
      return console.log("cannot bulk delete if bulk action is set to default");
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    const result = await bulkDeleteLocations(selectedLocations);
    if (result.error) return console.log("Unable to bulk delete locations");
    closeModal();
    setSelectedLocations([]);
    queryLocations();
  };

  return (
    <ListLocations
      locations={locations_}
      newLocation={newLocation}
      handleNewLocation={handleNewLocation}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applySearch={applySearch}
      batchSelect={batchSelect}
      handleSelected={handleSelected}
      selectedLocations={selectedLocations}
      submitNewLocation={submitNewLocation}
      handleDelete={handleDelete}
      modalActive={modalActive}
      modalState={modalState}
      closeModal={closeModal}
      pendingDelete={pendingDelete}
      applyDelete={applyDelete}
      editLocation={editLocation}
      handleChangeLocation={handleChangeLocation}
      handleEdit={handleEdit}
      pendingEdit={pendingEdit}
      applyEdit={applyEdit}
      page={page}
      pages={pages}
      hasPages={hasPages}
      nextPage={nextPage}
      prevPage={prevPage}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
    />
  );
}
