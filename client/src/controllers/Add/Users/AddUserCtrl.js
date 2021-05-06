import React, { useState, useEffect } from "react";
import AddUser from "../../../components/Add/Users";
import { createUser } from "../../../network";
import { useHistory } from "react-router-dom";

export default function AddUserCtrl() {
  const history = useHistory();
  // ===============================================================
  // FORM DATA
  // ===============================================================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Error Messaging
  const [directive, setDirective] = useState(null);
  // Preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resetDirective();
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      setDirective(null);
    }, 4000);
  };

  // ===============================================================
  // POST
  // ===============================================================
  const registerUser = async () => {
    setLoading(true);
    if (!username || !email || !role || !password)
      return setDirective({
        header: "Error creating user",
        message: "Required fields are missing",
        success: false,
      });
    if (password !== confirmPassword)
      return setDirective({
        header: "Error creating user",
        message: "Passwords do not match",
        success: false,
      });
    const user = {
      email: email,
      user_name: username,
      password: password,
      role: role,
    };
    const result = await createUser(user);
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error registering a user",
        message: result.error.data.error,
        success: false,
      });
    history.push("/users");
  };

  return (
    <AddUser
      // Attributes
      username={username}
      email={email}
      role={role}
      password={password}
      confirmPassword={confirmPassword}
      directive={directive}
      loading={loading}
      // Methods
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      changePassword={setPassword}
      changeConfirmPassword={setConfirmPassword}
      registerUser={registerUser}
    />
  );
}
