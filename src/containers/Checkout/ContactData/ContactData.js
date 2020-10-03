import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "name",
                    placeholder: "Your Name",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your E-Mail",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
            },
            address: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "address",
                    placeholder: "Your Address",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                },
            },
            postcode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    name: "postcode",
                    placeholder: "Your Postcode",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
                valid: true,
                validation: {},
            },
        },
        loading: false,
        isFormValid: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice.toFixed(2),
            orderData: formData,
            userId: this.props.userId,
        };

        this.props.onOrderBurger(order);
    };

    inputChangedHander = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validateInput(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;

        for (let inputId in updatedOrderForm) {
            isFormValid = isFormValid && updatedOrderForm[inputId].valid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid,
        });
    };

    validateInput = (input, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = isValid && input !== "";
        }

        if (rules.minLength) {
            isValid = isValid && input.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = isValid && input.length <= rules.maxLength;
        }

        return isValid;
    };

    render() {
        let form = <Spinner />;
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        if (!this.props.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map((formElement) => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) =>
                                this.inputChangedHander(event, formElement.id)
                            }
                        />
                    ))}
                    <Button
                        btnType="Success"
                        disabled={!this.state.isFormValid}
                    >
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (order) => dispatch(actions.purchaseBurger(order)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
