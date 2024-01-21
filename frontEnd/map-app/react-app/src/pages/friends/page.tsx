import React, { useContext, useRef, useState } from "react";
import { Sidebar } from "../global/Sidebar";
import AllFriends from "../../components/friends/AllFriends.tsx";
import Pending from "../../components/friends/Pending.tsx";
import AddFriends from "../../components/friends/AddFriends.tsx";
import Topbar from "../global/Topbar.tsx";

import AuthContext from "../../context/AuthProvider.tsx";

import axios from "../../api/axios";

const ADD_FRIENDS_URL = "api-auth/dashboard/make-request/";

const Friends = () => {
  const recieverRef: any = useRef();

  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;

  console.log(accessToken);

  const [category, setCategory] = useState("All");

  const resetFields = () => {
    if (recieverRef.current) {
      recieverRef.current.value = "";
    }
  };

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
    resetFields();
  };

  // const handleTest = (e: any) => {
  //   e.preventDefault();
  //   console.log(recieverRef.current.value);
  //   resetFields();
  // };

  const handleFriendRequest = async (e: any) => {
    e.preventDefault();
    const action = 0; // Sending a friend request
    try {
      const response: any = await axios.post(
        ADD_FRIENDS_URL,
        JSON.stringify({
          name: recieverRef.current.value,
          userToken: accessToken,
          action,
        }),
        { headers: { "Content-type": "application/json" } }
      );

      console.log(response);
      resetFields();
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        console.log("Something went wrong");
      } else if (err.response?.status === 408) {
        console.log("You timed out!");
      } else if (err.response?.status === 404) {
        console.log("Username Doesn't exist");
      } else if (err.response?.status === 409) {
        console.log("Already Friends");
      } else if (err.response?.status === 422) {
        console.log("Request Already Sent");
      } else {
        console.log("No Server Response");
      }
      resetFields();
    }
  };

  return (
    <div className="container">
      <Sidebar></Sidebar>
      <div className="friends">
        <Topbar></Topbar>
        <h1 className="fheader">Friends</h1>

        <div className="friends-bar">
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
          {category !== "Add Friend" ? (
            <div className="search">
              <input
                type="search"
                name="search"
                placeholder=" Search"
                autoFocus
              />
              <span className="material-symbols-outlined">search</span>
            </div>
          ) : (
            <div className="search">
              <input
                type="search"
                name="search"
                placeholder=" Search"
                ref={recieverRef}
                autoFocus
              />
              <button
                type="button"
                className="send-friend-request"
                onClick={handleFriendRequest}
              >
                Send Friend Request
              </button>
            </div>
          )}
          <p>{`${category}`}</p>
          {category === "All" && <AllFriends></AllFriends>}
          {category === "Pending" && <Pending></Pending>}
          {category === "Add Friend" && <AddFriends></AddFriends>}
        </div>
      </div>
    </div>
  );
};
export default Friends;
