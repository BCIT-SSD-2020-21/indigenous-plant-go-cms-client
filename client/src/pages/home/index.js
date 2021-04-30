import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  PlantIcon,
  CompassIcon,
  InfoIcon,
  UsersIcon,
  LocationIcon,
  MediaIcon,
  TourIcon,
} from "../../icons";

export default function Home({action, method}) {

  const authContext = useAuth();
  const {userData } = authContext;
  const user = userData.user.user_name
  const dateToday = Date()
 
  const history = useHistory();
  return (
    <main>
      {/* HERO SECTION */}
      <div style={style.hero}>
        <img
          style={style.image}
          // src="/assets/images/iip_logo.png"
          alt="Indigenous Initiatives and Partnerships Logo"
              />
        <div> Greetings {user}</div>
        <div> {dateToday}</div>
          
      </div>

      {/* QUICKLINK SECTION */}
      <div style={style.quicklinks}>
        <div className="subhead" style={style.subhead}>
          <h3>Quick Links</h3>
        </div>
        
        <div className="grid" style={style.grid}>
          <div className="col1" style={style.col} >
            <button className="field__button" style={style.button} onClick={() => history.push("/plants/add")}>
              <div style={style.icon}>
                <PlantIcon />
              </div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Plant</p>
              </div>
            </button>
            <button className="field__button"  style={style.button} onClick={() => history.push("/users/add")}>
              <div style={style.icon}><UsersIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>User</p>
              </div>
            </button>
          </div>

          <div className="col" style={style.col} >
            <button className="field__button" style={style.button} onClick={() => history.push("/waypoints/add")}>
              <div style={style.icon}><CompassIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Waypoint</p>
              </div>
            </button>
            <button className="field__button" style={style.button} onClick={() => history.push("/locations/add")}>
              <div style={style.icon}><LocationIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>User</p>
              </div>
            </button>
          </div>
          <div className="col" style={style.col} >
            <button className="field__button"  style={style.button}  onClick={() => history.push("/tours/add")}>
            <div style={style.icon}><TourIcon /></div>
              <div>
                <label style={style.addnew} >Add New </label>
                <p>Tour</p>
              </div>
            </button>
            <button className="field__button"  style={style.button} onClick={() => history.push("/learnmore/add")}>
              <div style={style.icon}><InfoIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Tour</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>);
}

const style = {
  hero : {
    border : "1px solid",
    borderColor : "black",
    minHeight : "500px",
    textAlign : "center",
  },
  image: {
    width: "100%",
    height: "10%",
  },
  subhead :{
    paddingTop: "10px",
    paddingLeft: "20px",
  },
  grid :{
    display: "flex"
  },
  col :{
    display: "block",
    padding: "20px",
    width: "100%"
  },
  button :{
    display: "flex",
    textAlign: "left",
  },
  icon :{
    paddingRight : "10px",
    color: "white",
  },
  addnew :{
    fontWeight: "bold"
  }
 
}

