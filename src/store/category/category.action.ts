import { Category, CATEGORY_ACTION_TYPES } from "./category.types";

import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer.utils";

export type FetchCategoriesStart =
  Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Array<Category>
>;

//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
//export const setCategories = (categoriesArray) => ({ type: CATEGORY_ACTION_TYPES.SET_CATEGORIES, payload: categoriesArray });

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
  Error
>;

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Array<Category>): FetchCategoriesSuccess =>
    createAction(
      CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFail = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error)
);

// * This is the code for redux thunk
// export const fetchCategoriesAsync = async (dispatch) => {
//     dispatch(fetchCategoriesStart());

//     try {
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));

//     } catch (error) {
//         dispatch(fetchCategoriesFail(error));

//     }
// }
