import React from "react";
import Logo from "../../Logo/Logo.js";
import NavigationItems from "../NavigationItems/NavigationItems.js";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems />
            </div>
        </Aux>
    );
};

export default sideDrawer;
