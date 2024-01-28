import React, { useContext, useEffect, useState } from "react";
import Profile from "../../assets/profile.jpg";

const FRIENDS_INFO_URL = "api-auth/dashboard/user-info/";
const ACTION_FRIENDS_URL = "api-auth/dashboard/make-request/";

import AuthContext from "../../context/AuthProvider.tsx";

import axios from "../../api/axios";

const AllFriends = () => {
  const [friends, setFriends] = useState([]);
  // const [showSpectatorPopup, setShowSpectatorPopup] = useState(false);
  // const [showCollaboratorPopup, setShowCollaboratorPopup] = useState(false);

  useEffect(() => {
    const processFriends = async () => {
      try {
        const response: any = await axios.post(
          FRIENDS_INFO_URL,
          {},
          {
            headers: { "Content-type": "application/json" },
            withCredentials: true,
          }
        );

        const parsedResponse = JSON.parse(response.request.response);
        const { friends } = parsedResponse;
        setFriends(friends);
      } catch (err: any) {
        if (err.response?.status === 400) {
          console.log("Something went wrong");
        }
      }
    };

    processFriends();
  }, []);

  const removeFriend = async (friendName: string) => {
    try {
      const action = 1;
      const response = await axios.post(
        ACTION_FRIENDS_URL,
        JSON.stringify({ name: friendName, action }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );

      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend !== friendName)
      );
    } catch (err: any) {
      console.log(err.response);
      if (err.response?.status === 400) {
        console.log("Something went wrong");
      } else if (err.response?.status === 408) {
        console.log("You timed out!");
      } else if (err.response?.status === 404) {
        console.log("Friend not in list");
      } else {
        console.log("No Server Response");
      }
    }
  };

  return (
    <ul className="friend-list">
      {friends.map((friend, index) => (
        <li key={index}>
          <img className="profile-pic" src={Profile} alt="" />
          <span className="friend-name">{friend}</span>
          <span
            className="material-symbols-outlined"
            onClick={() => removeFriend(friend)}
          >
            close
          </span>
        </li>
      ))}
    </ul>
  );
};
export default AllFriends;
