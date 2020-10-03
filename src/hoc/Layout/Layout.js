import React, { Component } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import firebase from "../../Firebase";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

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

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.onSetUserState(user.uid);
            } else {
                this.props.onDeleteUserState();
            }
        });
    }

    isMobile = () => {
        return window.innerWidth <= 500;
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    showSideDrawer={this.sideDrawerOpenedHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.isMobile}
                />
                {this.isMobile() ? (
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                ) : null}
                <div>Toolbar; Sidedrawer; Backdrop</div>
                <main className={classes.content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUserState: (userId) => dispatch(actions.setUserState(userId)),
        onDeleteUserState: () => dispatch(actions.deleteUserState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
