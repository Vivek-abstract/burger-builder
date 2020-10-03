import React, { Component } from "react";
import { connect } from "react-redux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null,
    };
    // db = firebase.firestore();

    componentDidMount() {
        this.props.initIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    errorDismissedHandler = () => {
        this.setState({ error: null });
    };

    purchaseContinueHandler = () => {
        this.setState({ purchasing: false });
        this.props.onInitPurchased();
        this.props.history.push({
            pathname: "/checkout",
        });
    };

    updatePurchaseState = () => {
        if (!this.props.ingredients) {
            return false;
        }
        const sum = Object.values(this.props.ingredients).reduce(
            (sum, curr) => {
                return sum + curr;
            },
            0
        );
        return sum > 0;
    };

    redirectHandler = () => {
        this.props.history.push({pathname:'/auth', search:'?redirectTo=checkout'})
    }

    render() {
        const disableInfo = {
            ...this.props.ingredients,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 ? true : false;
        }

        let orderSummary = null;
        let burger = <Spinner />;
        let buildControls = null;
        if (this.props.error) {
            burger = (
                <p>Ingredients can't be loaded! Please try again later.</p>
            );
        }
        if (this.props.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.totalPrice}
                />
            );
            burger = <Burger ingredients={this.props.ingredients} />;
            buildControls = (
                <BuildControls
                    ingredientAdded={this.props.addIngredientHandler}
                    ingredientRemoved={this.props.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState()}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuth}
                    redirected={this.redirectHandler}
                />
            );
        }

        let errors = (
            <Modal
                show={this.state.error}
                modalClosed={this.errorDismissedHandler}
            >
                Something went wrong!
            </Modal>
        );

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {errors}
                {burger}
                {buildControls}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchaseable: state.burgerBuilder.purchaseable,
        error: state.burgerBuilder.error,
        isAuth: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (type) => dispatch(actions.addIngredient(type)),
        removeIngredientHandler: (type) =>
            dispatch(actions.removeIngredient(type)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
