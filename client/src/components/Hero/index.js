import React from "react";
import { useAuth } from "../../context/AuthContext";


export default function Banner() {
    const authContext = useAuth()
    const {userData} = authContext
    return (
        <div style={style.kel}> Good Morning, {userData.user.user_name}
        </div>
    )
};

const style = {
    kel: { 
        height: "500px",
        borderColor: "blue",
        border: "1px solid",
        margin: "0",
        image: "gray"
    }
}