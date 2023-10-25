// export enum CART_ACTION_TYPES = {
//     TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
//     ADD_CART_ITEM: 'ADD_CART_ITEM'
// }
import { CategoryItem } from "../category/category.types";

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
