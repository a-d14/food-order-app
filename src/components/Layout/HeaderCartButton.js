import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);

    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

    const {items} = cartCtx;

    const numberOfItems = cartCtx.items.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0) return;
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;