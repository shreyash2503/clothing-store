// export const CATEGORY_ACTION_TYPES = {
//     FETCH_CATEGORIES_START: 'FETCH_CATEGORIES_START',
//     FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
//     FETCH_CATEGORIES_FAIL: 'FETCH_CATEGORIES_FAIL',
// }

export enum CATEGORY_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAIL = "category/FETCH_CATEGORIES_FAILED",
}

export type CategoryMap = {
  [key: string]: Array<CategoryItem>;
};

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};
export type Category = {
  title: string;
  imageUrl: string;
  items: Array<CategoryItem>;
};
