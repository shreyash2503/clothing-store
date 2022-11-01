import React from 'react';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
    setProduct: () => null,
});

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategories(categoryMap);
        }
        getCategoriesMap();
    }, []);
    const value = { categories };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}