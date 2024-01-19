import React, { useState } from "react";
import Logo from "../../assets/NinjaHead.png";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const [mapActive, setMapActive] = useState(
    location.pathname === "/dashboard"
  );
  const [friendsActive, setFriendsActive] = useState(
    location.pathname === "/friends"
  );

  console.log(mapActive, friendsActive);

  const handleMapLink = () => {
    setMapActive(true);
    setFriendsActive(false);
  };

  const handleFriendLink = () => {
    setFriendsActive(true);
    setMapActive(false);
  };

  return (
    <aside>
      <div className="toggle">
        <div className="sidebar-logo">
          <img src={Logo} alt="" />
          <h3>LowkeySpots</h3>
        </div>
        <div className="close" id="sidebar-close">
          <span className="material-symbols-outlined">menu</span>
        </div>
      </div>

      <div className="sidebar">
        <Link
          to="/dashboard"
          className={mapActive ? "sidebar-item active" : "sidebar-item"}
          onClick={handleMapLink}
        >
          <span className="material-symbols-outlined">map</span>
          <h4 className="display-6" id="dashboard-display">
            Maps
          </h4>
        </Link>
        <Link
          to="/friends"
          className={friendsActive ? "sidebar-item active" : "sidebar-item"}
          onClick={handleFriendLink}
        >
          <span className="material-symbols-outlined">group_add</span>
          <h4 className="display-6" id="dashboard-display">
            Friends
          </h4>
          <span className="friend-requests">12</span>
        </Link>
        <Link to="/friends" className="sidebar-item">
          <span className="material-symbols-outlined">logout</span>
          <h4 className="display-6" id="dashboard-display">
            Logout
          </h4>
        </Link>
      </div>
    </aside>
  );
};
