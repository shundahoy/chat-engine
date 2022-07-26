import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "./firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoadding] = useState(true);
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "bd1f8579-2ac7-4cb8-aacf-82ea53464467",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoadding(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.displayName);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "1af5914f-4001-4f96-9af6-07a72e5294da",
              },
            })
            .then(() => setLoadding(false))
            .catch((err) => console.log(err));
        });
      });
  }, [user, history]);
  if (!user || loading) return "loading";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">CHAT</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="bd1f8579-2ac7-4cb8-aacf-82ea53464467"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
