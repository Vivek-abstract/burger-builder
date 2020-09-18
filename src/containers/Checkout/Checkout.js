import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect, Route } from "react-router";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    };
    
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutContinued={this.checkoutContinued}
                        checkoutCancelled={this.checkoutCancelled}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};


export default connect(mapStateToProps)(Checkout);
