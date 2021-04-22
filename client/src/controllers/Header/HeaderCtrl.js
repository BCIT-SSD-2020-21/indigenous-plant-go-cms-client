import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

export default function HeaderCtrl() {
  const authContext = useAuth();
  const { setUserData, userData } = authContext;

  const handleSignout = () => {
    setUserData(null);
  };

  return <Header handleSignout={handleSignout} userData={userData} />;
}
