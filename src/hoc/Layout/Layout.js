import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    render() {
        return (
            <Aux>
                <Toolbar showSideDrawer={this.sideDrawerOpenedHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <div>Toolbar; Sidedrawer; Backdrop</div>
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        );
    }
}
export default Layout;
