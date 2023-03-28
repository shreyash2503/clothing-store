import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from "./cart.types";

export type SpecialCartItem = Omit<CartItem, "quantity">;

export type AddItemToCart = ActionWithPayload<
  CART_ACTION_TYPES.ADD_CART_ITEM,
  Array<CartItem>
>;
export type RemoveItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_CART_ITEM,
  Array<CartItem>
>;
export type ClearItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.CLEAR_CART_ITEM,
  Array<CartItem>
>;

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
  boolean
>;

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: SpecialCartItem
): Array<CartItem> => {
  const existingCartItem =
    cartItems && cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: Array<CartItem>,
  productToRemove: CartItem
): Array<CartItem> => {
  /// Subtract the item quantity by 1
  //find the  cart item to remove
  //check if quantity is equal to 1, if it is remove that item from the cart
  //else return cartitems with matching cart item with reduced quantity
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCart = (
  cartItems: Array<CartItem>,
  productToClear: CartItem
): Array<CartItem> => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};
// const removeCartItem = (cartItems, productToRemove) => {
//     return cartItems.filter(cartItem => cartItem.id === productToRemove.id && cartItem.quantity > 0 ? {...cartItem,quantity:cartItem.quantity-1}:)
// }

//! All the actions that will be passed to the dispatch functions

export const addItemToCart = withMatcher(
  (cartItems: Array<CartItem>, productToAdd: CartItem): AddItemToCart => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.ADD_CART_ITEM, newCartItems);
  }
);
export const clearItemFromCart = withMatcher(
  (cartItems: Array<CartItem>, productToClear: CartItem): ClearItemFromCart => {
    // remove the item from the cart permanently;
    const newCartItems = clearCart(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.CLEAR_CART_ITEM, newCartItems);
  }
);
export const removeItemFromCart = withMatcher(
  (
    cartItems: Array<CartItem>,
    productToRemove: CartItem
  ): RemoveItemFromCart => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.REMOVE_CART_ITEM, newCartItems);
  }
);

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, bool)
);
