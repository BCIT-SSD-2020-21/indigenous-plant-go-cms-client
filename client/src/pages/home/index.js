import React, {useState}from "react";
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
  const history = useHistory();
  const authContext = useAuth();
  const {userData } = authContext;
  
  //Get Signed in User
  const user = userData.user.user_name

  //Get Date
  const dateToday = new Date()
  const options = {  year: 'numeric', month: 'short', day: 'numeric' };
  const displayDate = dateToday.toLocaleDateString("en-US", options)
 
  //Get Clock
  const [time, setTime]=useState()
  const clock = ()=>{
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var time = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2)
    setTime(time)
    console.log(time)
  }
  setInterval(clock,1000)

  return (
    <main>
      {/* HERO SECTION */}
      <div style={style.hero}>
        <img
          style={style.image}
          // src="/assets/images/iip_logo.png"
          alt="Indigenous Initiatives and Partnerships Logo"
              />
        <span style={style.textDisplay}>
          <h1 style={style.time}> {time}</h1>
          <h3 style={style.greeting}>Hello,  {user}</h3>
          <div style={style.date}> {displayDate}</div>
        </span>
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
    position: "relative",
    border : "1px solid",
    borderColor : "black",
    minHeight : "500px",
    textAlign : "center",
   
  },
  image: {
    width: "100%",
    maxHeight: "500px",
  },
  textDisplay : {
    position : "absolute",
    top : "30%",
    left : "47%",
    // color: "white"
    color : "gray"
  },
  greeting:{
    textTransform : "capitalize",
    marginTop :"10px",
    marginBottom :"5px"
  },
  time :{
    marginBottom: "0"
  },
  date :{

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

