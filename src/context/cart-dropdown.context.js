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

const removeCartItem = (cartItems, productToRemove) => { /// Subtract the item quantity by 1
    //find the  cart item to remove
    //check if quantity is equal to 1, if it is remove that item from the cart
    //else return cartitems with matching cart item with reduced quantity
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

}
const clearCart = (cartItems, productToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id)
}
// const removeCartItem = (cartItems, productToRemove) => {
//     return cartItems.filter(cartItem => cartItem.id === productToRemove.id && cartItem.quantity > 0 ? {...cartItem,quantity:cartItem.quantity-1}:)
// }



export const CartDropdownProvider = ({ children }) => {
    const [down, setdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const clearItemFromCart = (productToClear) => { // remove the item from the cart permanently;
        setCartItems(clearCart(cartItems, productToClear))
    }
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }
    const value = { down, setdown, addItemToCart, cartItems, removeItemFromCart, clearItemFromCart, setCartItems }
    return (
        <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
    )
}
