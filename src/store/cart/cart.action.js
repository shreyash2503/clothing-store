import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) => ({ type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, payload: bool });



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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return { type: CART_ACTION_TYPES.ADD_CART_ITEM, payload: newCartItems }
}
export const clearItemFromCart = (cartItems, productToClear) => { // remove the item from the cart permanently;
    const newCartItems = clearCart(cartItems, productToClear)
    return { type: CART_ACTION_TYPES.ADD_CART_ITEM, payload: newCartItems }
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return { type: CART_ACTION_TYPES.ADD_CART_ITEM, payload: newCartItems }


}