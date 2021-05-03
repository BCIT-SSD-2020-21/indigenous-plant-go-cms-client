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

  /* 
    @desc invoke queryUser on mount
    @author Patrick Fortaleza
  */
  useEffect(() => {
    queryUser();
  }, []);

  /* 
    @desc queries the user's data and delegates to state variables
    @author Patrick Fortaleza
  */
  const queryUser = async () => {
    if (!userId) return console.log("unable to find user id");
    const result = await getUser(userId);
    if (result.error) return console.log("unable to fetch user data");

    // delegate
    setEmail(result.email);
    setRole(result.role);
    setUsername(result.user_name);
  };

  /* 
    @desc toggles changePassword to true
    @author Patrick Fortaleza
  */
  const toggleChangePassword = () => {
    setChangePassword(true);
  };

  /* 
    @desc toggles changePassword to false and resets form controls related to passwords.
    @author Patrick Fortaleza
  */
  const cancelChangePassword = () => {
    setChangePassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  // ===============================================================
  // POST
  // @desc applies the updates to the given user.
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
      // METHODS
      toggleChangePassword={toggleChangePassword}
      cancelChangePassword={cancelChangePassword}
      changeUsername={setUsername}
      changeEmail={setEmail}
      changeRole={setRole}
      changeNewPassword={setNewPassword}
      changeConfirmPassword={setConfirmPassword}
      applyUpdate={applyUpdate}
      // ATTRIBUTES
      changePassword={changePassword}
      username={username}
      email={email}
      role={role}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
    />
  );
}
