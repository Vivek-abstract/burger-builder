import * as actionTypes from "./actionsTypes";
import firebase from "../../Firebase";

const db = firebase.firestore();

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        db.collection("orders")
            .add(orderData)
            .then((res) => {
                console.log(res);
                dispatch(purchaseBurgerSuccess(res.id, orderData));
            })
            .catch((err) => {
                console.error(err);
                dispatch(purchaseBurgerFailed(err));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
