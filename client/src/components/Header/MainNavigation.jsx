import React,{useState} from "react";

import "../../css/Header/MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = props =>{
    const [drawerIsOpen,setDrawerIsOpen] = useState(false);

    const drawerOpen = props => {
        setDrawerIsOpen(true);
    };

    const drawerClose = props => {
        setDrawerIsOpen(false);
    };

    return (
    <React.Fragment>
    {drawerIsOpen && <Backdrop onClick={drawerClose}/>}
    {drawerIsOpen && <SideDrawer>
        <nav className="main-navigation__drawer-nav">
            <Navlinks />
        </nav>
    </SideDrawer>}
    <MainHeader>
        <button className="main-navigation__menu-btn" onClick={drawerOpen}>
          <span />
          <span />
          <span /> 
        </button>

        <h1 className="main-navigation__title">
            <Link to="/"> Bid-Block </Link>
        </h1>

        <nav>
         <Navlinks />
        </nav>
    </MainHeader>
    </React.Fragment>);
};

export default MainNavigation;