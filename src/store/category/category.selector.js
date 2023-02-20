import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    return state.category;
}
export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categoriesArray)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
)


export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.isLoading)