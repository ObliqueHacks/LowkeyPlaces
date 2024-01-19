import React, { useState } from "react";
import { Sidebar } from "../global/Sidebar";

const Friends = () => {
  const [category, setCategory] = useState("All");

  const handleCatgeory = (cat: string) => {
    switch (cat) {
      case "all":
        setCategory("All");
        break;
      case "pending":
        setCategory("Pending");
        break;
      case "blocked":
        setCategory("Blocked");
        break;
      case "addfriend":
        setCategory("Add Friend");
        break;
    }
  };

  return (
    <div className="container">
      <Sidebar></Sidebar>
      <div className="friends">
        <h1 className="fheader">Friends</h1>

        <div className="friends-bar">
          <br />
          <br />
          <span className="friends-item" onClick={() => handleCatgeory("all")}>
            All
          </span>
          <span
            className="friends-item"
            onClick={() => handleCatgeory("pending")}
          >
            Pending
          </span>
          <span
            className="friends-item"
            onClick={() => handleCatgeory("blocked")}
          >
            Blocked
          </span>
          <span
            className="friends-item"
            onClick={() => handleCatgeory("addfriend")}
          >
            Add Friend
          </span>
        </div>
        <div className="friends-info">
          <div className="search">
            <input
              type="search"
              name="search"
              placeholder=" Search"
              autoFocus
            />
            <span className="material-symbols-outlined">search</span>
          </div>
          <p>{`${category}`}</p>
          <ul className="friend-list">
            <li>
              <img src="" alt="" />
              <span className="friend-name">Friend 1#</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Friends;
