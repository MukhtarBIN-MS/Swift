import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Profile.css";
import Feed from "../../components/Feed/Feed";
import RightBar from "../../components/RightBar/RightBar";
import SideBar from "../../components/SideBar/SideBar";
import Topbar from "../../components/Topbar/Topbar";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () =>{
         const res = await axios.get(`/users?username=${username}`);
         setUser(res.data)
    };
    fetchUser();
   
}, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
              <div className="profileCover">
              <img className="profileCoverImage" src={user.coverPicture ?  PF + user.coverPicture : PF + 'nocover.png'} alt="cover picture"/>
              <img className="profileUserImage" src={user.profilePicture ?  PF + user.profilePicture : PF + 'noavatar.png'} alt="user image"/>
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
              </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
