import React from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function SidebarCtrl() {
  const authContext = useAuth();
  const { userData } = authContext;
  const location = useLocation();

  console.log(location);
  return <Sidebar userData={userData} />;
}
