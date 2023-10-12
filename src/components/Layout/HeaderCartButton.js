import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((acc, item) => {
        return acc + item.amount;
    }, 0);

    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;