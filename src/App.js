import React, { lazy, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Redirect, Route, Switch } from "react-router";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));

function App(props) {
    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <Layout>
            <Suspense fallback={<Spinner />}>{routes}</Suspense>
        </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};
export default connect(mapStateToProps)(App);
