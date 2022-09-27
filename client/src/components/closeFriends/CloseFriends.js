import React from 'react';
import './closeFriends.css';
import { User } from '../../dummydata';

export default function closeFriends({user}) {
    return (
        <li className="sidebarFriend">
                <img src={user.profilePicture} alt="" className="sidebarFriendImage"/>
                <span className="sidebarFriendName">{user.username}</span>
            </li>
    )
}
