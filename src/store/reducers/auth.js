import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility/utility";

const initialState = {
    isAuthenticated: false,
    userId: null,
    loading: false,
    error: null,
};

const authStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, { loading: false });
};

const authFailure = (state, action) => {
    return updateObject(state, { loading: false, error: action.error });
};

const setUserState = (state, action) => {
    return updateObject(state, {
        isAuthenticated: true,
        userId: action.userId,
    });
};

const deleteUserState = (state, action) => {
    return updateObject(state, { isAuthenticated: false, userId: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILURE:
            return authFailure(state, action);
        case actionTypes.SET_USER_STATE:
            return setUserState(state, action);
        case actionTypes.DELETE_USER_STATE:
            return deleteUserState(state, action);
        default:
            return state;
    }
};

export default reducer;
