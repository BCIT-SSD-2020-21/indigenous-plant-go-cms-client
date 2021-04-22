import React from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function SidebarCtrl() {
  const authContext = useAuth();
  const { userData } = authContext;
  return <Sidebar userData={userData} />;
}
