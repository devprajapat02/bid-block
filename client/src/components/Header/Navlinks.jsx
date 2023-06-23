import React from "react";

import "../../css/Header/Navlinks.css";
import { NavLink } from "react-router-dom";

const Navlinks = props =>{
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact="true">Home</NavLink>
        </li>
        <li>
            <NavLink to="/:userid/items">My Items</NavLink>
        </li>
        <li>
            <NavLink to="/:userid/listitem" >List Item</NavLink>
        </li>
        <li>
            <NavLink to="/:userid/id">My Profile</NavLink>
        </li>
    </ul>
};

export default Navlinks;