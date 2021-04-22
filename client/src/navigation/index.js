import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
/*
  ======================================================== 
  IMPORTING PAGES
  ========================================================
*/
// 1.0 HOME PAGE
import Home from "../pages/home";
// 2.0 PLANTS
import AllPlants from "../pages/plants/AllPlants";
import AddPlant from "../pages/plants/AddPlant";
import EditPlant from "../pages/plants/EditPlant";
import PlantCategories from "../pages/plants/PlantCategories";
// 3.0 WAYPOINTS
import AllWaypoints from "../pages/waypoints/AllWaypoints";
import AddWaypoint from "../pages/waypoints/AddWaypoint";
import EditWaypoint from "../pages/waypoints/EditWaypoint";
import WaypointCategories from "../pages/waypoints/WaypointCategories";
// 4.0 LEARN MORE
import AllLearnMore from "../pages/learnmore/AllLearnMore";
import AddLearnMore from "../pages/learnmore/AddLearnMore";
import EditLearnMore from "../pages/learnmore/EditLearnMore";
// 5.0 USERS
import AllUsers from "../pages/users/AllUsers";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
// 6.0 LOCATIONS
import Locations from "../pages/locations";
// 7.0 MEDIA
import Images from "../pages/media/Images";
import AudioFiles from "../pages/media/AudioFiles";
import Videos from "../pages/media/Videos";
// 8.0 TAGS
import Tags from "../pages/tags";
// 9.0 PROFILE
import Profile from "../pages/profile";
// 10.0 LOGIN
import Login from "../pages/login";

// Routes that should only be visible if authenticated.
// TO DO: Write authentication context
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;

  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

// Routes that should only be visible if NOT authenticated
// TO DO: Write authentication context
const AnonymousRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default function Navigation() {
  return (
    <>
      <Switch>
        {/* 1.0 HOME */}
        <PrivateRoute exact path="/" component={Home} />

        {/* 2.0 PLANTS */}
        <PrivateRoute exact path="/plants" component={AllPlants} />
        <PrivateRoute exact path="/plants/add" component={AddPlant} />
        <PrivateRoute
          exact
          path="/plants/edit/:plantId"
          component={EditPlant}
        />
        <PrivateRoute
          exact
          path="/plants/categories"
          component={PlantCategories}
        />

        {/* 3.0 WAYPOINTS */}
        <PrivateRoute exact path="/waypoints" component={AllWaypoints} />
        <PrivateRoute exact path="/waypoints/add" component={AddWaypoint} />
        <PrivateRoute
          exact
          path="/waypoints/edit/:waypointId"
          component={EditWaypoint}
        />
        <PrivateRoute
          exact
          path="/waypoints/categories"
          component={WaypointCategories}
        />

        {/* 4.0 LEARN MORE */}
        <PrivateRoute path="/learnmore" component={AllLearnMore} />
        <PrivateRoute path="/learnmore/add" component={AddLearnMore} />
        <PrivateRoute
          path="/learnmore/edit/:learnmoreId"
          component={EditLearnMore}
        />

        {/* 5.0 USERS */}
        <PrivateRoute path="/users" component={AllUsers} />
        <PrivateRoute path="/users/add" component={AddUser} />
        <PrivateRoute path="/users/edit/:userId" component={EditUser} />

        {/* 6.0 LOCATIONS */}
        <PrivateRoute path="/locations" component={Locations} />

        {/* 7.0 MEDIA */}
        <PrivateRoute path="/images" component={Images} />
        <PrivateRoute path="/audiofiles" component={AudioFiles} />
        <PrivateRoute path="/videos" component={Videos} />

        {/* 8.0 TAGS */}
        <PrivateRoute path="/tags" component={Tags} />

        {/* 9.0 PROFILE */}
        <PrivateRoute path="/profile" component={Profile} />

        {/* 10.0 LOGIN */}
        <AnonymousRoute path="/login" component={Login} />
      </Switch>
    </>
  );
}
