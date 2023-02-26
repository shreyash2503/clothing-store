//import { useContext, Fragment } from "react";
import { Fragment, useEffect } from "react";
//import { CategoriesContext } from "../../context/categories.context";
import { ProductCard } from "../../product-card.component";
import { Link } from "react-router-dom";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import './shop.syles.scss';
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/category.selector";
//import { fetchCategoriesAsync } from "../../store/category/category.action";
import { fetchCategoriesStart } from "../../store/category/category.action";
import Spinner from "../../spinner.component";


const Shop = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectCategoriesIsLoading);
    useEffect(() => {
        // const categoryArray = await getCategoriesAndDocuments();
        // console.log(categoryArray);
        //setCategories(categoryMap);
        dispatch(fetchCategoriesStart());
    }, []);
    //const { categories } = useContext(CategoriesContext);
    const categories = useSelector(selectCategoriesMap);
    console.log(categories);
    return (
        isLoading ? (<Spinner />) : (<Fragment>
            {
                Object.keys(categories).map(title => {
                    return (
                        <Fragment key={title}>
                            <Link to={`/shop/${title}`}>
                                <h2>{title.toUpperCase()}</h2>
                            </Link>
                            <div className="products-container">
                                {categories[title].map((product, index) => {
                                    return (
                                        index > 3 ? <></> : <ProductCard key={product.id} product={product} />
                                    )
                                })}
                            </div>
                        </Fragment>
                    )
                })
            }
        </Fragment>))
}
export default Shop;