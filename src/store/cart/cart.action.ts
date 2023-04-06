import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from "./cart.types";
import { CategoryItem } from "../category/category.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
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

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  Array<CartItem>
>;

export const setCartItems = withMatcher(
  (cartItems: Array<CartItem>): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: Array<CartItem>,
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: Array<CartItem>,
  productToClear: CartItem
): SetCartItems => {
  // remove the item from the cart permanently;
  const newCartItems = clearCart(cartItems, productToClear);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: Array<CartItem>,
  productToRemove: CartItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);
