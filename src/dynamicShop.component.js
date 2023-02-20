import { useEffect } from 'react';
import { React, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { CategoriesContext } from './context/categories.context';
import './dynamicShop.styles.scss';
import { ProductCard } from './product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from './store/category/category.selector';
import Spinner from './spinner.component';
const DynamicShop = () => {
    const params = useParams();
    //const { categories } = useContext(CategoriesContext);
    const categories = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    console.log(categories);
    const [products, setProducts] = useState([]);
    //console.log('render/re-rendering dynamic shop');

    useEffect(() => {
        console.log('effect fired set products');
        setProducts(categories[params.id]);
    }, [categories, params.id]);
    return (
        <Fragment>
            <h1>{params.id.toUpperCase()}</h1>
            {isLoading ? <Spinner /> :
                <div className='dynamic-products-container'>
                    {products && products.map((product) => {
                        return (
                            <ProductCard key={product.name} product={product} />
                        )
                    })}
                </div>

            }
        </Fragment>
    )
}
export default DynamicShop;