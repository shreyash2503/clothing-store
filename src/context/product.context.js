import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import PRODUCTS from '../shop-data.json'

export const ProductContext = createContext({
    product: [],
    setProduct: () => null,
});

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(PRODUCTS);
    const value = { product };
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}