import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            amount: props.ingredients[ingredient],
            name: ingredient,
        });
    }

    const ingredientOutput = ingredients.map((ig) => (
        <span key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>
            {ig.name} ({ig.amount})
        </span>
    ));

    return (
        <div className={classes.Order}>
            <h4>Ingredients: {ingredientOutput}</h4>
            <h4>
                Price: <strong>USD {props.totalPrice.toFixed(2)}</strong>
            </h4>
        </div>
    );
};

export default order;
