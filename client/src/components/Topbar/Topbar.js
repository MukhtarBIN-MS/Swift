import React, { useContext } from 'react';
import './Topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
    
        <div className="topbarContainer">
           <div className="topbarLeft">
               <span className="logo">
                   Swift
               </span>
           </div>
           <div className="topbarCenter">
               
           </div>
           <div className="topbarRight">
               <div className="searchbar">
                 <Search className="searchIcon" />
                 <input placeholder="search here" className="searchInput"/>
               </div>
               <div className="topbarIcons">
                   <div className="topbarIconItems">
                      <Person className="topbarIcon" />
                      <span className="topbarIconBadge">1</span>
                   </div>
                   <div className="topbarIconItems">
                      <Chat className="topbarIcon"  />
                      <span className="topbarIconBadge">3</span>
                   </div>
                   <div className="topbarIconItems">
                      <Notifications  className="topbarIcon" />
                      <span className="topbarIconBadge">1</span>
                   </div>
                   <Link to={`/profile/${user.username}`}>
                   <img src={ user.profilePicture ? PF + user.profilePicture : PF + 'noavatar.png'} alt="profile_pic" className="topbarImage"/>
                   </Link>
               </div>
           </div>
         
        </div>
        
        
    );
}
