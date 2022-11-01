import { useEffect } from 'react';
import { React, useContext, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from './context/categories.context';
import './dynamicShop.styles.scss';
import { ProductCard } from './product-card.component';
const DynamicShop = () => {
    const params = useParams();
    const { categories } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(categories[params.id]);
    }, [categories, params.id]);
    return (
        <Fragment>
            <h1>{params.id.toUpperCase()}</h1>
            <div className='dynamic-products-container'>
                {products && products.map((product) => {
                    return (
                        <ProductCard key={product.name} product={product} />
                    )
                })}
            </div>
        </Fragment>
    )
}
export default DynamicShop;