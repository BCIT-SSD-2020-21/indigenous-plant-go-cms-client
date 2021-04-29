import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { useAuth } from "../../context/AuthContext";
import { updateUser } from "../../network";

export default function ProfileCtrl() {
  const authContext = useAuth();
  const { userData, queryUser } = authContext;
  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState(userData?.user.user_name);
  const [email, setEmail] = useState(userData?.user.email);
  const [role, setRole] = useState(userData?.user.role);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleChangePassword = () => {
    setChangePassword(true);
  };

  const cancelChangePassword = () => {
    setChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const applyUpdate = async () => {
    const id = userData.user._id;
    if (!id) return console.log("error updating user data");

    let userData_ = {
      email: email,
      user_name: username,
      role: role,
    };

    if (changePassword) {
      if (!newPassword || !confirmPassword)
        return console.log("password fields are empty.");
      if (newPassword !== confirmPassword)
        return console.log("password don't match.");

      userData_ = {
        ...userData_,
        password: newPassword,
      };
    }

    const result = await updateUser(userData_, id);
    if (result.error) return console.log("Unable to update the user's data.");
    queryUser();
  };

  return (
    <Profile
      toggleChangePassword={toggleChangePassword}
      cancelChangePassword={cancelChangePassword}
      changePassword={changePassword}
      username={username}
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      email={email}
      role={role}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      changeNewPassword={setNewPassword}
      changeConfirmPassword={setConfirmPassword}
      applyUpdate={applyUpdate}
    />
  );
}
