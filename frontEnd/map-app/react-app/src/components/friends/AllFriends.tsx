import React, { useContext, useEffect, useState } from "react";
import Profile from "../../assets/profile.jpg";

const FRIENDS_INFO_URL = "api-auth/dashboard/user-info/";
const ACTION_FRIENDS_URL = "api-auth/dashboard/make-request/";

import AuthContext from "../../context/AuthProvider.tsx";

import axios from "../../api/axios";

const AllFriends = ({ addFriendMap }: { addFriendMap: boolean }) => {
  const { auth }: any = useContext(AuthContext);
  const { accessToken }: any = auth;
  console.log(accessToken);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const processFriends = async () => {
      try {
        const response: any = await axios.post(
          FRIENDS_INFO_URL,
          JSON.stringify({ userToken: accessToken }),
          { headers: { "Content-type": "application/json" } }
        );

        const parsedResponse = JSON.parse(response.request.response);
        const { friends } = parsedResponse;
        setFriends(friends);
      } catch (err: any) {
        console.log(err.response);
        if (err.response?.status === 400) {
          console.log("Something went wrong");
        }
      }
    };

    processFriends();
  }, [accessToken]);

  const removeFriend = async (friendName: string) => {
    try {
      const action = 1;
      const response = await axios.post(
        ACTION_FRIENDS_URL,
        JSON.stringify({ name: friendName, userToken: accessToken, action }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
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
      {addFriendMap
        ? friends.map((friend, index) => (
            <li key={index}>
              <img className="profile-pic" src={Profile} alt="" />
              <span className="friend-name">{friend}</span>
              <span className="material-symbols-outlined">add</span>
            </li>
          ))
        : friends.map((friend, index) => (
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
