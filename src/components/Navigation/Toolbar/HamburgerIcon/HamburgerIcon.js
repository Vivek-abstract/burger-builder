import React from "react";
import classes from "./HamburgerIcon.module.css";

const hamburgerIcon = (props) => {
    return (
        <div className={classes.HamburgerIcon} onClick={props.showSideDrawer}>
            <div className={classes.HamburgerLine}></div>
            <div className={classes.HamburgerLine}></div>
            <div className={classes.HamburgerLine}></div>
        </div>
    );
};

export default hamburgerIcon;
