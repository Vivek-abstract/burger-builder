import React, { Component } from "react";
import Order from "../../components/Order/Order";
import firebase from "../../Firebase";
import Modal from "../../components/UI/Modal/Modal";

class Orders extends Component {
    db = firebase.firestore();
    state = {
        orders: null,
        error: null,
    };

    componentDidMount() {
        const fetchedOrders = [];
        this.db
            .collection("orders")
            .get()
            .then((orders) => {
                orders.forEach((order) => {
                    fetchedOrders.push({
                        ...order.data(),
                        id: order.id,
                    });
                });
                this.setState({ orders: fetchedOrders });
            })
            .catch((err) => {
                this.setState({ error: err });
            });
    }

    render() {
        let errors = (
            <Modal
                show={this.state.error}
                modalClosed={this.errorDismissedHandler}
            >
                Something went wrong!
            </Modal>
        );
        let orders = null;
        if (this.state.orders) {
            orders = this.state.orders.map((order) => (
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

export default Orders;
