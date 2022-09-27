import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./RightBar.css";
import { Users } from "../../dummydata";
import Online from "../Online/Online";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function RightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );


  useEffect(() => {
    const getFriends = async () => {
      try {
        const FriendList = await axios.get("/users/friends/" + user._id);
        setFriends(FriendList.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="Container">
          <div className="Trends">
            <div className="Trends_4u">Suggestions for you</div>
          </div>
          <div className="Trending_worldwide">
            <div className="Trending_show">Trending Trending_worldwide</div>
            <div className="tag">#World News</div>
            <div className="spark_people">125k</div>
            <div className="sparks">30,230 people are sparking this</div>
          </div>
        </div>

        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle"> User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoValue">{user.country}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Occupation: </span>
            <span className="rightbarInfoValue">{user.occupation}</span>
          </div>
        </div>
        <h4 className="rightbarTitle"> My Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "noavatar.png"
                  }
                  alt="friends image"
                  className="rightbarFollowingImage"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
