import * as actionTypes from "./actionsTypes";
import firebase from "../../Firebase";

const db = firebase.firestore();

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type,
    };
};

export const removeIngredient = (type) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientType: type,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const ingredientsFetchFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        db.collection("ingredients")
            .doc("default-config")
            .get()
            .then((ingredients) => {
                dispatch(setIngredients(ingredients.data()));
            })
            .catch((err) => {
                dispatch(ingredientsFetchFailed());
            });
    };
};
