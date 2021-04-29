import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function Sidebar() {

    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <>
           <div className="sidebar">
               <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={toggleSidebar} />
               </Link>
           </div>
           <nav className={"nav-menu" + (sidebar ? " active" : "")}>
               <ul className="nav-menu-items">
                   <li className="sidebar-toggle">
                       <Link to="#" className="menu-bars">
                           <AiIcons.AiOutlineClose />
                       </Link>
                   </li>
               </ul>
           </nav>
        </>
    );
}

export default Sidebar;