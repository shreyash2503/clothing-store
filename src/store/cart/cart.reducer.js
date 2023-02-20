import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INTITIAL_STATE = {
    cartItems: [],
    down: false
}

export const cartReducer = (state = CART_INTITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                down: payload
            }
        case CART_ACTION_TYPES.ADD_CART_ITEM:
            return {
                ...state,
                cartItems: payload
            }
        default:
            return state;
    }
}