import * as actionTypes from "./actionsTypes";
import firebase from "../../Firebase";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const authFailure = (err) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: err,
    };
};

export const auth = (email, password, isRegister) => {
    return (dispatch) => {
        dispatch(authStart());

        if (isRegister) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    dispatch(authSuccess(res.data));
                })
                .catch((err) => {
                    dispatch(authFailure(err));
                });
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    dispatch(authSuccess(res.data));
                })
                .catch((err) => {
                    dispatch(authFailure(err));
                });
        }
    };
};

export const setUserState = (userId) => {
    return {
        type: actionTypes.SET_USER_STATE,
        userId: userId,
    };
};

export const deleteUserState = () => {
    return {
        type: actionTypes.DELETE_USER_STATE,
    };
};

export const logout = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(deleteUserState());
            })
            .catch((err) => console.error(err));
    };
};
