import {React,useContext} from "react";
import axios from "axios";
import "../../css/Header/Navlinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@mantine/core";

const Navlinks = props =>{
    const auth = useContext(AuthContext);
    
    async function logoutHandler(){
        try{
            const res = await axios.post('http://localhost:5000/userData/logout', {}, {withCredentials:true});
            console.log(res);
            if(res.status === 200){
                console.log("Successfully logged out!")
                auth.logout()
            }else{
              console.log(res.data.error);
            }
    
          } catch(err){
             console.log("Problem in logout , please try again.", err)
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