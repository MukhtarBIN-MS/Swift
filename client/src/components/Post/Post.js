import React, {useState, useEffect, useContext } from "react";
import axios from 'axios';
import { MoreVert } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import LoopIcon from "@material-ui/icons/Loop";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import "./Post.css";
import { AuthContext } from "../../context/AuthContext";


export default function Post({ post }) {

  const [ like, setLike ] = useState(post.likes.length);
  const [ isliked, setIsLiked ] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () =>{
         const res = await axios.get(`/users?userId=${post.userId}`);
         setUser(res.data)
    };
    fetchUser();
   
}, [post.userId]);


  const likeHandler = () =>{
    try{
        axios.put("/posts/" + post._id +"/like", {  userId:currentUser._id }   )
    }
    catch(err){

    }
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);

  }

    return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? PF + user.profilePicture : PF + "noavatar.png" }
              alt="post_image"
              className="postProfileImage"
            />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postArea">
          <div className="postBottom">
            <div className="postBottomTop">
              <div className="postIconsSet">
                <CommentIcon className="postIcon" />
                <span className="likeCount">{post.comment}</span>
              </div>
              <div className="postIconsSet">
                {isliked ? <FavoriteIcon className="postIcon"  onClick={likeHandler}/> :

                <FavoriteBorderIcon className="postIcon"  onClick={likeHandler}  />
                }
                
                <span className="likeCount">{like}</span>
              </div>
              <LoopIcon className="postIcon" />
            </div>
            <div className="postBottomDown">
              <ShareIcon className="postIcon" />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img src={PF + post.img} className="postImage" alt="post image" />
          </div>
        </div>
      </div>
    </div>
  );
}
