import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SidebarData from './SidebarData';
import './Sidebar.css';

function Sidebar() {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <>
           <div className="sidebar">
               <Link to="#" className="menu-bars">
                <FaIcons.FaBars style={{ color: '#FFFFFF' }} onClick={toggleSidebar} />
               </Link>
           </div>
           <nav className={"nav-menu" + (sidebar ? " active" : "")}>
               <ul id="nav-menu-items" onClick={toggleSidebar}>
                   <li className="sidebar-toggle">
                       <Link to="#" className="menu-bars">
                           <AiIcons.AiOutlineClose style={{ color: '#FFFFFF' }} />
                       </Link>
                   </li>
                   { SidebarData.map((item, index) => {
                           return (
                               <li key={index} className={item.className}>
                                   <Link to={item.path}>
                                       <span>{item.title}</span>
                                   </Link>
                               </li>
                           )
                       }) }
               </ul>
           </nav>
        </>
    );
}

export default Sidebar;