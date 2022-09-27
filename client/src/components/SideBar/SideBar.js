import React from "react";
import "./SideBar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Users } from '../../dummydata';
import CloseFriends from '../closeFriends/CloseFriends';
import { Link } from 'react-router-dom';
import { Home, Chat, Notifications,  HelpOutline, Group, AccountCircleSharp, School} from "@material-ui/icons";

export default function SideBar({user}) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to ="/" style={{textDecoration:'none', color:'black'}}>
          <li className="sidebarListItem">
             <Home className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span>
          </li>
          </Link>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">Notifications</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <School  className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
          <li className="sidebarListItem">
            <AccountCircleIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>

        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
       
      </div>
    </div>
  );
}
