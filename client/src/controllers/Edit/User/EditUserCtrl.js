import React, { useState, useEffect } from "react";
import EditUser from "../../../components/Edit/User";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../network";
import { useHistory } from "react-router-dom";

export default function EditUserCtrl() {
  const history = useHistory();
  const { userId } = useParams();
  // ===============================================================
  // FORM DATA
  // ===============================================================
  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    queryUser();
  }, []);

  const queryUser = async () => {
    if (!userId) return console.log("unable to find user id");
    const result = await getUser(userId);
    if (result.error) return console.log("unable to fetch user data");
    console.log(result);

    // delegate
    setEmail(result.email);
    setRole(result.role);
    setUsername(result.user_name);
  };

  const toggleChangePassword = () => {
    setChangePassword(true);
  };

  const cancelChangePassword = () => {
    setChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  // ===============================================================
  // POST
  // ===============================================================
  const applyUpdate = async () => {
    const id = userId;
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
    history.push("/users");
  };

  return (
    <EditUser
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
