import React from 'react';
import './Online.css';

export default function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="righbarFriend">
        <div className="rightbarProfileImageContainer">
            <img className="rightbarProfileImage" src={PF + user.profilePicture} alt="Freinds"/>
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
        </li>
    );
}
