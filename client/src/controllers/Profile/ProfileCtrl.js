import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";

export default function ProfileCtrl() {
  const [changePassword, setChangePassword] = useState(false);

  const toggleChangePassword = () => {
    setChangePassword(true);
  };

  const cancelChangePassword = () => {
    setChangePassword(false);
  };

  return (
    <Profile
      toggleChangePassword={toggleChangePassword}
      cancelChangePassword={cancelChangePassword}
      changePassword={changePassword}
    />
  );
}
