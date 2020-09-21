import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    
    componentDidMount() {
        this.props.fetchOrders();
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
            orders = this.props.orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={+order.totalPrice}
                />
            ));
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
        loading: state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
