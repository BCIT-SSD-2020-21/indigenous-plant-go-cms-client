import React from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

export default function HeaderCtrl() {
  const authContext = useAuth();
  const { setUserData } = authContext;

  const handleSignout = () => {
    setUserData(null);
  };

  return <Header handleSignout={handleSignout} />;
}
