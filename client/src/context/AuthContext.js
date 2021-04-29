import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ping, getUser } from "../network";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useLocalStorage("userData", null);
  const [isAuthenticated, setAuthentication] = useState(true);

  const signOut = () => {
    setAuthentication(false);
    setUserData(null);
  };

  const validateToken = async () => {
    const result = await ping();
    if (result.error) return signOut();
  };

  const queryUser = async () => {
    const id = userData.user._id;
    if (!id) return console.log("missing user id");
    const result = await getUser(id);
    if (result.error) return console.log("error fetching user data");
    const updatedUser = {
      accessToken: userData.accessToken,
      user: {
        ...result,
      },
    };
    setUserData(updatedUser);
  };

  useEffect(() => {
    const pingToken = async () => {
      await validateToken();
    };

    pingToken();
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
    queryUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
