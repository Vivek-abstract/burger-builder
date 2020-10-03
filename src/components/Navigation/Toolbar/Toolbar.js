import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {props.show() ? (
                <HamburgerIcon showSideDrawer={props.showSideDrawer} />
            ) : null}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuthenticated} />
            </nav>
        </header>
    );
};

export default toolbar;
