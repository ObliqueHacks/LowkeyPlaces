import React, { useContext, useRef, useState } from "react";
import Sidebar from "../global/Sidebar";
import AllFriends from "../../components/friends/AllFriends.tsx";
import Pending from "../../components/friends/Pending.tsx";
import AddFriends from "../../components/friends/AddFriends.tsx";
import Topbar from "../global/Topbar.tsx";
import { ToastContainer, toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";

import AuthContext from "../../context/AuthProvider.tsx";

import axios from "../../api/axios";

const ADD_FRIENDS_URL = "api-auth/dashboard/make-request/";

const Friends = () => {
  const recieverRef: any = useRef();

  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;

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

      toast.success("Friend Request Was Sent!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      resetFields();
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("Something went wrong! Please logout and login.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (err.response?.status === 408) {
        toast.error("You timed out! Please login again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (err.response?.status === 404) {
        toast.error("Username Doesn't exist!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (err.response?.status === 409) {
        toast.error("Already Friends!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (err.response?.status === 422) {
        toast.error("Request Already Sent!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("No Server Response", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      resetFields();
    }
  };

  return (
    <div className="container">
      <Sidebar editMap={false}></Sidebar>
      <Fade>
        <div className="friends">
          <Topbar></Topbar>
          <h1 className="fheader">Friends</h1>

          <div className="friends-bar">
            <span
              className="friends-item"
              onClick={() => handleCatgeory("all")}
            >
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
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
              </div>
            )}
            <p>{`${category}`}</p>
            {category === "All" && (
              <AllFriends addFriendMap={false}></AllFriends>
            )}
            {category === "Pending" && <Pending></Pending>}
            {category === "Add Friend" && <AddFriends></AddFriends>}
          </div>
        </div>
      </Fade>
    </div>
  );
};
export default Friends;
