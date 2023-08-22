import {React,useContext} from "react";
import axios from "axios";
import "../../css/Header/Navlinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@mantine/core";
import post from "../../utils/post";

const Navlinks = props =>{
    const auth = useContext(AuthContext);
    
    async function logoutHandler(){

        const res = await post('http://localhost:5000/userData/logout', {}, true, true);
        if (res.status === 200) {
            auth.logout()
        }
    }

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact="true">Home</NavLink>
        </li>

        {auth.isLoggedIn && <li>
            <NavLink to="/:userid/items">My Items</NavLink>
        </li>}

        {auth.isLoggedIn && <li>
            <NavLink to="/listitem" >List Item</NavLink>
        </li>}

        {auth.isLoggedIn && <li>
            <NavLink to="/:userid/id">My Profile</NavLink>
        </li>}

        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">Login</NavLink>
        </li>}
        
        {auth.isLoggedIn && <li>
            <NavLink to="/">Connect</NavLink>
        </li>}

        {auth.isLoggedIn && <li>
            <Button type="submit" onClick={logoutHandler} >Logout</Button>
        </li>}
    </ul>
};

export default Navlinks;