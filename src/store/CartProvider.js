import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        // console.log(action.item);
        let updatedItems;
        const updatedAmount = state.totalAmount + action.item.amount * action.item.price;

        const updatedItemIndex = state.items.findIndex(item => item.id === action.item.id);

        // console.log(updatedItemIndex);

        if(updatedItemIndex !== -1) {
            const updatedItem = {...state.items[updatedItemIndex], amount: state.items[updatedItemIndex].amount + 
            action.item.amount};
            updatedItems = [...state.items];
            updatedItems[updatedItemIndex] = updatedItem;
        } else {
            updatedItems = [...state.items, action.item];
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    
    if(action.type === 'REMOVE') {
        console.log('a = ' + action.id);
        const updatedItemIndex = state.items.findIndex((item) => item.id === action.id);
        console.log(updatedItemIndex);
        let updatedItem = state.items[updatedItemIndex];
        const updatedTotalAmount = state.totalAmount - updatedItem.price;

        let updatedItems;

        if(updatedItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            updatedItems = [...state.items];
            updatedItems[updatedItemIndex].amount -= 1;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState;
}

const CartProvider = props => {

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;