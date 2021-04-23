import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useHistory } from "react-router-dom";

export default function SidebarCtrl() {
  const authContext = useAuth();
  const { userData } = authContext;
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const [sidebarModel, setSidebarModel] = useState({
    dashboard: true,
    plants: false,
    waypoints: false,
    learnmore: false,
    users: false,
    locations: false,
    media: false,
    tags: false,
    profile: false,
  });
  const [pathParts, setPathParts] = useState([]);

  const evaluatePath = () => {
    let pathParts = pathname.split("/").filter((string) => string);
    let currentPath = pathParts[0];
    if (!currentPath || currentPath === undefined) currentPath = "dashboard";

    const newSidebarModel = {
      dashboard: false,
      plants: false,
      waypoints: false,
      learnmore: false,
      users: false,
      locations: false,
      media: false,
      tags: false,
      profile: false,
    };

    newSidebarModel[currentPath] = true;
    setSidebarModel(newSidebarModel);
    setPathParts(pathParts);
  };

  useEffect(() => {
    evaluatePath();
  }, [location]);

  // DASHBOARD
  const navigateToHome = () => {
    history.push("/");
  };
  // PLANTS
  const navigateToAllPlants = () => {
    history.push("/plants");
  };
  const navigateToAddPlant = () => {
    history.push("/plants/add");
  };
  const navigateToPlantCategories = () => {
    history.push("/plants/categories");
  };
  // WAYPOINTS
  const navigateToAllWaypoints = () => {
    history.push("/waypoints");
  };
  const navigateToAddWaypoint = () => {
    history.push("/waypoints/add");
  };
  const navigateToWaypointCategories = () => {
    history.push("/waypoints/categories");
  };
  // LEARN MORE
  const navigateToAllLearnmore = () => {
    history.push("/learnmore");
  };
  const navigateToAddLearnmore = () => {
    history.push("/learnmore/add");
  };
  // USERS
  const navigateToAllUsers = () => {
    history.push("/users");
  };
  const navigateToAddUser = () => {
    history.push("/users/add");
  };
  // LOCATIONS
  const navigateToLocations = () => {
    history.push("/locations");
  };
  // MEDIA
  const navigateToImages = () => {
    history.push("/media/images");
  };
  const navigateToAudioFiles = () => {
    history.push("/media/audiofiles");
  };
  const navigateToVideos = () => {
    history.push("/media/videos");
  };
  // TAGS
  const navigateToTags = () => {
    history.push("/tags");
  };
  // PROFILE
  const navigateToProfile = () => {
    history.push("/profile");
  };

  return (
    <Sidebar
      userData={userData}
      sidebarModel={sidebarModel}
      pathParts={pathParts}
      // DASHBOARD
      navigateToHome={navigateToHome}
      // PLANTS
      navigateToAllPlants={navigateToAllPlants}
      navigateToAddPlant={navigateToAddPlant}
      navigateToPlantCategories={navigateToPlantCategories}
      // WAYPOINTS
      navigateToAllWaypoints={navigateToAllWaypoints}
      navigateToAddWaypoint={navigateToAddWaypoint}
      navigateToWaypointCategories={navigateToWaypointCategories}
      // LEARN MORE
      navigateToAllLearnmore={navigateToAllLearnmore}
      navigateToAddLearnmore={navigateToAddLearnmore}
      // USERS
      navigateToAllUsers={navigateToAllUsers}
      navigateToAddUser={navigateToAddUser}
      // LOCATIONS
      navigateToLocations={navigateToLocations}
      // MEDIA
      navigateToImages={navigateToImages}
      navigateToAudioFiles={navigateToAudioFiles}
      navigateToVideos={navigateToVideos}
      // TAGS
      navigateToTags={navigateToTags}
      // PROFILE
      navigateToProfile={navigateToProfile}
    />
  );
}
