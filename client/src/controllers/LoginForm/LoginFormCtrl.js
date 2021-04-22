import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function LoginFormCtrl() {
  const [username, setUsername] = useLocalStorage("username", "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useLocalStorage("rememberMe", true);

  useEffect(() => {
    if (rememberMe === false) {
      setUsername("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attemptLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted.");
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
