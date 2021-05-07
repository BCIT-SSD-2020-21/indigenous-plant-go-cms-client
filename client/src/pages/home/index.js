import React, {useState, useEffect}from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  PlantIcon,
  CompassIcon,
  InfoIcon,
  UsersIcon,
  LocationIcon,
  TourIcon,
} from "../../icons";

export default function Home({action, method}) {
  const history = useHistory();
  const authContext = useAuth();
  const {userData} = authContext;
  
  //Get Signed in User
  const [user, setUser] = useState()
  useEffect(() => {
    setUser(userData.user.user_name);
  }, []);

 
  //Get Date
  const dateToday = new Date()
  const options = {  year: 'numeric', month: 'short', day: 'numeric' };
  const displayDate = dateToday.toLocaleDateString("en-US", options)
 
  //Get Clock
  const [time, setTime]=useState()
  const clock = ()=>{
    var date = new Date();
    var minute = date.getMinutes();
    var hour = date.getHours() 
    var formathour;
    if(hour > 12){
      formathour = hour - 12
    }
    if(hour === 0){
     formathour = 12
    }
    
    var amOrPm;
    if(hour >= 12){
      amOrPm = "PM"
    } else {
      amOrPm = "AM"
    }
  
    if(hour> 12){
      var time = ("0" + formathour).substr(-2) + ":" + ("0" + minute).substr(-2) +  ` ${amOrPm}`
    } else {
      time = ("0" + hour).substr(-2) + ":" + ("0" + minute).substr(-2) +  ` ${amOrPm}`
    }
    
    setTime(time)
  }
  setInterval(clock,1000)

  return (
    <main className="homewrapper">
      {/* HERO SECTION */}
      <div style={style.hero}>
      <img className="carousel" style={style.image} src="/assets/images/hero.jpg" alt="Indigenous Initiatives and Partnerships Logo Red"/>
        {/* <Carousel fade interval="8000" indicators={false} controls = {false}>
          <Carousel.Item>
            <img className="carousel" style={style.image} src="/assets/images/hero.jpg" alt="Indigenous Initiatives and Partnerships Logo Red"/>
          </Carousel.Item>
        </Carousel> */}
      
        <span style={style.textDisplay}>
          <h1 style={style.time}> {time}</h1>
          <h3 style={style.greeting}>Ey' Swayel,  {user}!</h3>
          <div style={style.date}> {displayDate}</div>
        </span>
      </div>

      {/* QUICKLINK SECTION */}
      <div style={style.quicklinks}>
        <div className="subhead" style={style.subhead}>
          <h3>Quick Links</h3>
        </div>
        
        <div className="grid" style={style.grid}>
          <div className="col" style={style.col} >
            <button className="link__button" style={style.button} onClick={() => history.push("/plants/add")}>
              <div className="quickicons"  style={style.icon}>
                <PlantIcon  />
              </div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Plant</p>
              </div>
            </button>
            <button className="link__button"  style={style.button} onClick={() => history.push("/users/add")}>
              <div style={style.icon}><UsersIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>User</p>
              </div>
            </button>
          </div>

          <div className="col" style={style.col} >
            <button className="link__button" style={style.button} onClick={() => history.push("/waypoints/add")}>
              <div style={style.icon}><CompassIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Waypoint</p>
              </div>
            </button>
            <button className="link__button" style={style.button} onClick={() => history.push("/locations/add")}>
              <div style={style.icon}><LocationIcon /></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Location</p>
              </div>
            </button>
          </div>
          <div className="col" style={style.col} >
            <button className="link__button"  style={style.button}  onClick={() => history.push("/tours/add")}>
            <div style={style.icon}><TourIcon /></div>
              <div>
                <label style={style.addnew} >Add New </label>
                <p>Tour</p>
              </div>
            </button>
            <button className="link__button"  style={style.button} onClick={() => history.push("/learnmore/add")}>
              <div style={style.icon}><InfoIcon/></div>
              <div>
                <label style={style.addnew}>Add New </label>
                <p>Learn More</p>
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
    minHeight : "500px",
    textAlign : "center",
   
  },
  image: {
    width: "100%",
    maxHeight: "600px",
    // objectFit: "cover"
  },
  quicklinks :{
    paddingLeft : "20px",
  },
  subhead :{
    paddingTop: "20px",
    paddingBottom: "10px"
  },
  textDisplay : {
    position : "absolute",
    top : "30%",
    left : "47%",
    color : "#d9d9d9",
    zIndex: "1"
  },
  greeting:{
    textTransform : "capitalize",
    fontSize : "175%",
    marginTop :"10px",
    marginBottom :"5px"
  },
  time :{
    marginBottom: "0",
    fontSize : "350%"
  },
  date :{
    fontSize : "145%"
  },
  
  grid :{
    display: "flex"
  },
  col :{
    display: "block",
    paddingLeft: "0",
    paddingRight : "20px",
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

