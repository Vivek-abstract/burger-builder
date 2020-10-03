import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import order from "../../components/Order/Order";
import { NavLink } from "react-router-dom";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.userId);
    }

    render() {
        let errors = (
            <Modal
                show={this.props.error}
                modalClosed={this.errorDismissedHandler}
            >
                Something went wrong!
            </Modal>
        );
        let orders = <Spinner />;
        if (!this.props.loading) {
            console.log(this.props.orders);
            if (this.props.orders.length) {
                orders = this.props.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                    />
                ));
            } else {
                orders = (
                    <div style={{textAlign: 'center'}}>
                        This page is empty! Go ahead and <NavLink to="/">place some orders...</NavLink>
                    </div>
                );
            }
        }

        return (
            <div>
                {errors}
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.order.error,
        orders: state.order.orders,
        loading: state.order.loading,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (userId) => dispatch(actions.fetchOrders(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
