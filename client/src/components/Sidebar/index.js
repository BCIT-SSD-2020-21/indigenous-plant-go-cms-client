import React from "react";
import {
  DashboardIcon,
  PlantIcon,
  CompassIcon,
  InfoIcon,
  UsersIcon,
  LocationIcon,
  MediaIcon,
  TagIcon,
} from "../../icons";

export default function Sidebar({
  userData,
  navigateToHome,
  navigateToAllPlants,
  navigateToAddPlant,
  navigateToPlantCategories,
  navigateToAllWaypoints,
  navigateToAddWaypoint,
  navigateToWaypointCategories,
  navigateToAllLearnmore,
  navigateToAddLearnmore,
  navigateToAllUsers,
  navigateToAddUser,
  navigateToLocations,
  navigateToImages,
  navigateToAudioFiles,
  navigateToVideos,
  navigateToTags,
  navigateToProfile,
}) {
  return (
    <aside className="sidebar">
      <ul>
        {/* DASHBOARD */}
        <li>
          <button onClick={() => navigateToHome()}>
            <span className="menu__item item__wrap">
              <DashboardIcon />
              <span className="menu__item item__label">Dashboard</span>
            </span>
          </button>
        </li>

        {/* PLANTS */}
        <li>
          <button onClick={() => navigateToAllPlants()}>
            <span className="menu__item item__wrap">
              <PlantIcon />
              <span className="menu__item item__label">Plants</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToAllPlants()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Plants</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddPlant()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToPlantCategories()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Categories</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* WAYPOINTS */}
        <li>
          <button onClick={() => navigateToAllWaypoints()}>
            <span className="menu__item item__wrap">
              <CompassIcon />
              <span className="menu__item item__label">Waypoints</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToAllWaypoints()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Waypoints</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddWaypoint()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToWaypointCategories()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Categories</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* LEARN MORE */}
        <li>
          <button onClick={() => navigateToAllLearnmore()}>
            <span className="menu__item item__wrap">
              <InfoIcon />
              <span className="menu__item item__label">Learn More</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToAllLearnmore()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Learn More</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddLearnmore()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* USERS */}
        <li>
          <button onClick={() => navigateToAllUsers()}>
            <span className="menu__item item__wrap">
              <UsersIcon />
              <span className="menu__item item__label">Users</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToAllUsers()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Users</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddUser()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* LOCATIONS */}
        <li>
          <button onClick={() => navigateToLocations()}>
            <span className="menu__item item__wrap">
              <LocationIcon />
              <span className="menu__item item__label">Locations</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToLocations()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Locations</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* MEDIA */}
        <li>
          <button onClick={() => navigateToImages()}>
            <span className="menu__item item__wrap">
              <MediaIcon />
              <span className="menu__item item__label">Media</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToImages()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Images</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToVideos()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Video</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAudioFiles()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">Audio</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* TAGS */}
        <li>
          <button onClick={() => navigateToTags()}>
            <span className="menu__item item__wrap">
              <TagIcon />
              <span className="menu__item item__label">Tags</span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToTags()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">All Tags</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* PROFILE */}
        <li>
          <button onClick={() => navigateToProfile()}>
            <span className="menu__item item__wrap">
              <span style={style.initial}>
                {" "}
                {userData?.user?.username[0].toUpperCase()}
              </span>
              <span className="menu__item item__label">
                {" "}
                {userData?.user?.username}
              </span>
            </span>
          </button>
          <ul className="menu__item sub__menu">
            <li>
              <button onClick={() => navigateToProfile()}>
                <span className="menu__item item__wrap">
                  <span className="menu__item item__label">My Profile</span>
                </span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

const style = {
  initial: {
    height: "26px",
    width: "26px",
    backgroundColor: "var(--highlight)",
    border: "1px solid var(--highlightsecondary)",
    color: "var(--lightprimary)",
    borderRadius: "50%",
    lineHeight: "24px",
    textAlign: "center",
    fontFamily: "serif, Times",
    display: "block",
    cursor: "pointer",
    fontSize: 14,
  },
};
