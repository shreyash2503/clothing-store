import { AnyAction } from "redux";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  setIsCartOpen,
} from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly cartItems: Array<CartItem>;
  readonly down: boolean;
};

export const CART_INTITIAL_STATE: CartState = {
  cartItems: [],
  down: false,
};

export const cartReducer = (
  state = CART_INTITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (addItemToCart.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (removeItemFromCart.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (clearItemFromCart.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (setIsCartOpen.match(action)) {
    return { ...state, down: action.payload };
  }
  return state;

  // switch (type) {
  //     case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
  //         return {
  //             ...state,
  //             down: payload
  //         }
  //     case CART_ACTION_TYPES.ADD_CART_ITEM:
  //         return {
  //             ...state,
  //             cartItems: payload
  //         }
  //     default:
  //         return state;
  // }
};
