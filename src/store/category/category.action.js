import { CATEGORY_ACTION_TYPES } from "./category.types";
//import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
//export const setCategories = (categoriesArray) => ({ type: CATEGORY_ACTION_TYPES.SET_CATEGORIES, payload: categoriesArray });
export const fetchCategoriesStart = () => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START })
export const fetchCategoriesSuccess = (categoriesArray) => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categoriesArray })
export const fetchCategoriesFail = (error) => ({ type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, payload: error })



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