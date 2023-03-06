
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFail } from './category.action';
import { CATEGORY_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');//! the second argunment is what the first take as input
        yield put(fetchCategoriesSuccess(categoriesArray));
        // * put can be compared to the genertor version of dispatch
    } catch (error) {
        yield put(fetchCategoriesFail(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
    // * the first argument in the takeLatest is the action one wants to respone to
    // & Here we are responding to category_action_types.fetch_categories_start with fetchCategoriesAsync

}


export function* categoriesSaga() {
    yield all([call(onFetchCategories)]) //*  Run everything inside of all untill it finishes
}
