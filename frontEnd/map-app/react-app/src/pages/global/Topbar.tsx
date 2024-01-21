import { Link, useLocation } from "react-router-dom";
import Profile from "../../assets/profile.jpg";

import AuthContext from "../../context/AuthProvider.tsx";
import React, { useContext } from "react";

const Topbar = () => {
  const { auth }: any = useContext(AuthContext);
  console.log(auth);
  const { user }: any = auth;

  return (
    <div className="topbar">
      {" "}
      <span className="material-symbols-outlined">notifications</span>{" "}
      <span className="material-symbols-outlined">settings</span>{" "}
      <h6>{user}</h6> <img src={Profile} alt="" />
    </div>
  );
};
export default Topbar;
