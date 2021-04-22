import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import { login } from "../../network";
import { useAuth } from "../../context/AuthContext";

export default function LoginFormCtrl() {
  const authContext = useAuth();
  const { setUserData } = authContext;
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", true);

  useEffect(() => {
    if (rememberMe === false) {
      setUsername("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attemptLogin = async (e) => {
    e.preventDefault();
    const result = await login({ username, password });
    if (result.error) return console.log("Error ocurred when attempting login");
    const user = {
      token: result,
    };
    setUserData(user);
  };

  return (
    <LoginForm
      // PROPERTIES
      username={username}
      password={password}
      rememberMe={rememberMe}
      // METHODS
      setPassword={setPassword}
      setUsername={setUsername}
      setRememberMe={setRememberMe}
      attemptLogin={attemptLogin}
    />
  );
}
