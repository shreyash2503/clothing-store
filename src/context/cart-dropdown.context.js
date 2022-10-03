import { useState } from "react";
import { createContext } from "react";
export const CartDropdownContext = createContext({
    down: false,
    setdown: () => { },
    cartItems: [],
    setCartItems: () => { }

});
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return (cartItems.map((cartItem) => {
            return (
                cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } :
                    cartItem)
        }))
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const CartDropdownProvider = ({ children }) => {
    const [down, setdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value = { down, setdown, addItemToCart, cartItems }
    return (
        <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
    )
}
