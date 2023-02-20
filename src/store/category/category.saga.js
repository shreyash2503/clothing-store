
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFail } from './category.action';
import { CATEGORY_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');//! the second argunment is what the first take as input
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFail(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}


export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}
