import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    orders: [],
    loading: false,
    purchases: false,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const newOrder=  {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        }
        case actionTypes.PURCHASE_BURGER_FAILURE: {
            return {
                ...state,
                loading: false,
            }
        }
        case actionTypes.PURCHASE_BURGER_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PURCHASE_INIT: {
            return {
                ...state,
                purchased: false
            }
        }
        default:
            return state;   
    }
}

export default reducer;