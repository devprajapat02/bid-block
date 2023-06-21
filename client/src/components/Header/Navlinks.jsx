import React from "react";

import "../../css/Header/Navlinks.css";
import { NavLink } from "react-router-dom";

const Navlinks = props =>{
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact="true">Home</NavLink>
        </li>
        <li>
            <NavLink to="/user/items">My Items</NavLink>
        </li>
        <li>
            <NavLink to="/user/id/listitem" >List Item</NavLink>
        </li>
        <li>
            <NavLink to="/user/id">My Profile</NavLink>
        </li>
    </ul>
};

export default Navlinks;