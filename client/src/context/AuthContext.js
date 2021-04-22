import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("userData", null);
  const [isAuthenticated, setAuthentication] = useState(false);

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
