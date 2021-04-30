import React, { useState, useEffect } from "react";
import AddUser from "../../../components/Add/Users";
import { createUser } from "../../../network";
import { useHistory } from "react-router-dom";

export default function AddUserCtrl() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    if (!username || !email || !role || !password)
      return console.log("Required fields are missing");
    if (password !== confirmPassword)
      return console.log("Passwords don't match");
    const user = {
      email: email,
      user_name: username,
      password: password,
      role: role,
    };
    const result = await createUser(user);
    if (result.error) return console.log("Error registering user");
    history.push("/users");
  };

  return (
    <AddUser
      username={username}
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      email={email}
      role={role}
      password={password}
      confirmPassword={confirmPassword}
      changePassword={setPassword}
      changeConfirmPassword={setConfirmPassword}
      registerUser={registerUser}
    />
  );
}
