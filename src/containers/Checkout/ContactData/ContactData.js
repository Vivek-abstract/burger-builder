import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import firebase from "../../../Firebase";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postcode: "",
        },
        loading: false,
    };
    db = firebase.firestore();

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            name: "Vivek Gawande",
            address: {
                street: "50, Rosevilla",
                postcode: 400050,
            },
        };
        this.setState({ loading: true });
        this.db
            .collection("orders")
            .add(order)
            .then((res) => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    loading: false,
                    error: err,
                });
            });
    };

    render() {
        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form>
                    <input
                        className={classes.Input}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                    />
                    <input
                        className={classes.Input}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="street"
                        placeholder="Street"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="postcode"
                        placeholder="Post Code"
                    />
                    <Button btnType="Success" clicked={this.orderHandler}>
                        ORDER
                    </Button>
                </form>
            );
        }

        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
