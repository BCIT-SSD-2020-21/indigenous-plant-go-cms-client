import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import { login } from "../../network";

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

  const attemptLogin = async (e) => {
    e.preventDefault();
    const result = await login({ username, password });
    console.log(result);
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
