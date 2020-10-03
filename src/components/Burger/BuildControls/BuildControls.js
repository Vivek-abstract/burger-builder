import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
    let button = (
        <button
            disabled={!props.purchaseable}
            onClick={props.ordered}
            className={classes.OrderButton}
        >
            ORDER NOW
        </button>
    );

    if (!props.isAuth) {
        button = (
            <button
                disabled={!props.purchaseable}
                onClick={props.redirected}
                className={classes.OrderButton}
            >
                SIGN UP TO ORDER
            </button>
        );
    }

    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>${props.price.toFixed(2)}</strong>
            </p>
            {controls.map((control) => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />
            ))}
            {button}
        </div>
    );
};

export default buildControls;
