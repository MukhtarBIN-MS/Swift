import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";

/*  import { thunk, reducers, redux } from "react-redux";
    import { Provider, store, action } from "redux-thunk";  */

import "./Share.css";
import { AuthContext } from "../../context/AuthContext";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",  fileName);
      data.append("file",  file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err){}
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noavatar.png"
            }
            alt="profile_image"
            className="shareProfileImage"
          />
          <input
            placeholder={"What's on your mind  " + user.username + " ??"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {
          file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="red" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Smile</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Post{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
//this might not be the end of the code