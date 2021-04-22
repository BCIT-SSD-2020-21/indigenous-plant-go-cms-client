import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ping } from "../network";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("userData", null);
  const [isAuthenticated, setAuthentication] = useState(false);

  const signOut = () => {
    setAuthentication(false);
    setUserData(null);
  };

  const validateToken = async () => {
    const result = await ping();
    if (result.error) return signOut();
  };

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    if (userData === null || !userData) {
      setAuthentication(false);
    } else {
      setAuthentication(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const value = {
    // Properties
    userData,
    isAuthenticated,
    // Methods
    setUserData,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
