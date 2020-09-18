import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            const oldCount = state.ingredients[action.ingredientType];
            const updatedCount = oldCount + 1;
            const updatedIngredients = { ...state.ingredients };
            updatedIngredients[action.ingredientType] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[action.ingredientType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            return {
                totalPrice: newPrice,
                ingredients: updatedIngredients,
            };
        }
        case actionTypes.DELETE_INGREDIENT: {
            const oldCount = state.ingredients[action.ingredientType];
            if (oldCount !== 0) {
                const updatedCount = oldCount - 1;
                const updatedIngredients = { ...state.ingredients };
                updatedIngredients[action.ingredientType] = updatedCount;
                const priceSubtraction =
                    INGREDIENT_PRICES[action.ingredientType];
                const oldPrice = state.totalPrice;
                const newPrice = oldPrice - priceSubtraction;

                return {
                    totalPrice: newPrice,
                    ingredients: updatedIngredients,
                };
            }
            break;
        }
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;
