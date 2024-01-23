import React, { useContext, useEffect, useState } from "react";
import Profile from "../../assets/profile.jpg";

import AuthContext from "../../context/AuthProvider.tsx";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../api/axios";

const FRIENDS_INFO_URL = "api-auth/dashboard/user-info/"; // Getting User Info
const ACTION_FRIENDS_URL = "api-auth/dashboard/make-request/"; // Accepting/Rejecting

const Pending = () => {
  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;
  console.log(accessToken);

  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    const processFriendRequests = async () => {
      try {
        const response: any = await axios.post(
          FRIENDS_INFO_URL,
          JSON.stringify({ userToken: accessToken }),
          { headers: { "Content-type": "application/json" } }
        );

        const parsedResponse = JSON.parse(response.request.response);

        const { incomingRequests } = parsedResponse;
        setIncomingRequests(incomingRequests);
        console.log(incomingRequests);
      } catch (err: any) {
        console.log(err.response);
        if (err.response?.status === 400) {
          console.log("Something went wrong");
        }
      }
    };

    processFriendRequests();
  }, [accessToken]);

  const handleTest = () => {
    toast.info("Friend Request Was Accepted!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const acceptFriendRequest = async (requestName: string) => {
    try {
      const action = 1;
      const response = await axios.post(
        ACTION_FRIENDS_URL,
        JSON.stringify({ name: requestName, userToken: accessToken, action }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
      toast.info("Friend Request Was Accepted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIncomingRequests((prevRequests) =>
        prevRequests.filter((request) => request !== requestName)
      );
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        toast.error("Something went wrong", {
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
        toast.error("You timed out!", {
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
        toast.error("Friend request not found", {
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
    }
  };

  const denyFriendRequest = async (requestName: string) => {
    try {
      const action = 2;
      const response = await axios.post(
        ACTION_FRIENDS_URL,
        JSON.stringify({ name: requestName, userToken: accessToken, action }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
      setIncomingRequests((prevRequests) =>
        prevRequests.filter((request) => request !== requestName)
      );
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        console.log("Something went wrong");
      } else if (err.response?.status === 408) {
        console.log("You timed out!");
      } else if (err.response?.status === 404) {
        console.log("Friend request not found");
      } else {
        console.log("No Server Response");
      }
    }
  };

  return (
    <ul className="friend-list">
      {incomingRequests.map((request, index) => (
        <li key={index}>
          <img className="profile-pic" src={Profile} alt="" />
          <span className="friend-name">
            {request} <br />
            <div className="request">Incoming friend request</div>
          </span>

          <div className="accept-deny">
            <span
              className="material-symbols-outlined"
              onClick={() => acceptFriendRequest(request)}
            >
              done
            </span>

            <span
              className="material-symbols-outlined"
              onClick={() => denyFriendRequest(request)}
            >
              close
            </span>
          </div>
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
        </li>
      ))}
    </ul>
  );
};

export default Pending;
