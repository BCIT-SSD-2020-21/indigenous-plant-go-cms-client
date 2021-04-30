import React from "react";
import { useHistory } from "react-router-dom";

export default function Home({action, method}) {
  const history = useHistory();
  return (
    <main>
      <div style={style.hero}>
      <img
        style={style.image}
        // src="/assets/images/iip_logo.png"
        alt="Indigenous Initiatives and Partnerships Logo"
            />
      </div>

      {/* QUICKLINK SECTION */}
      <div style={style.quicklinks}>
        <h4>Quick Links</h4>
        <div className="grid" style={style.grid}>
          <div className="col1" style={style.col} >
            <button 
              className="field__button" 
              onClick={() => history.push("/plants/add")}>
              <label >Add New </label>
              <p>Plant</p>
            </button>
            <button className="field__button"  onClick={() => history.push("/users/add")}>
              <label >Add New </label>
              <p>User</p>
            </button>
          </div>
          <div className="col" style={style.col} >
            <button className="field__button"  onClick={() => history.push("/waypoints/add")}>
              <label >Add New </label>
              <p>Waypoint</p>
            </button>
            <button className="field__button"  onClick={() => history.push("/locations/add")}>
              <label >Add New </label>
              <p>Location</p>
            </button>
          </div>
          <div className="col" style={style.col} >
            <button className="field__button" onClick={() => history.push("/tours/add")}>
              <label >Add New </label>
              <p>Tour</p>
            </button>
            <button className="field__button" onClick={() => history.push("/learnmore/add")}>
              <label >Add New </label>
              <p>Learn More</p>
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
  grid :{
    display: "flex"
  },
  col :{
    display: "block",
    padding: "20px",
    width: "100%"
  }
 
}
