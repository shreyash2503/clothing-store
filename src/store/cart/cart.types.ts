// export enum CART_ACTION_TYPES = {
//     TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
//     ADD_CART_ITEM: 'ADD_CART_ITEM'
// }

export enum CART_ACTION_TYPES {
  TOGGLE_CART_DROPDOWN = "cart/TOGGLE_CART_DROPDOWN",
  ADD_CART_ITEM = "cart/ADD_CART_ITEM",
  REMOVE_CART_ITEM = "cart/REMOVE_CART_ITEM",
  CLEAR_CART_ITEM = "cart/CLEAR_CART_ITEM",
}

export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
};
