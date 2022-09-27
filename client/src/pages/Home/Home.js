import React from 'react';
import './style.css';
import Feed from '../../components/Feed/Feed';
import RightBar from '../../components/RightBar/RightBar';
import SideBar from '../../components/SideBar/SideBar';
import Topbar from '../../components/Topbar/Topbar';


export default function Home() {
    return (
        <>
         <Topbar/>
         <div className="homeContainer">
             <SideBar/>
             <Feed/>
             <RightBar/>
         </div>
        </>
    );
}
