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
                dispatch(purchaseBurgerSuccess(res.id, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailure = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILURE,
        error: err
    }
}


export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (userId) => {
    return dispatch => {
        const fetchedOrders = [];

        db
        .collection("orders")
        .where('userId', '==', userId)
        .get()
        .then((orders) => {
            orders.forEach((order) => {
                fetchedOrders.push({
                    ...order.data(),
                    id: order.id,
                });
            });
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch((err) => {
            dispatch(fetchOrderFailure(err))
        });
    }
}