import classes from "./Auth.module.css";
import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as queryString from "query-string";

class Auth extends Component {
    state = {
        form: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    name: "email",
                    placeholder: "Your Email",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    name: "password",
                    placeholder: "Your Password",
                },
                value: "",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
        isRegister: true,
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

        if (rules.isEmail) {
            var filter = /^\S+@\S+$/;
            isValid = isValid && filter.test(input);
        }

        return isValid;
    };

    inputChangedHander = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.form };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validateInput(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({
            form: updatedOrderForm,
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.form.email.value,
            this.state.form.password.value,
            this.state.isRegister
        );
    };

    switchAuthHandler = () => {
        this.setState((prevState) => ({
            isRegister: !prevState.isRegister,
        }));
    };

    render() {
        const formElementArray = [];

        for (let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key],
            });
        }

        let form = formElementArray.map((formElement) => (
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
        ));

        let alternateLink = this.state.isRegister
            ? "Already a user? Log in"
            : "Not a user? Register";

        let redirect = null;
        if (this.props.isAuthenticated) {
            const parsed = queryString.parse(
                this.props.history.location.search
            );

            if (parsed.redirectTo) {
                redirect = <Redirect to={parsed.redirectTo} />;
            } else {
                // User hasn't made a burger yet
                redirect = <Redirect to="/" />;
            }
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        {this.state.isRegister ? "Register" : "Login"}
                    </Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>
                    {alternateLink}
                </Button>
            </div>
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
        onAuth: (email, password, isRegister) =>
            dispatch(actions.auth(email, password, isRegister)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
