import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import { ProductCard } from "../../product-card.component";
import { Link } from "react-router-dom";
import './shop.syles.scss';
const Shop = () => {
    const { categories } = useContext(CategoriesContext);
    console.log(categories);
    return (
        <Fragment>
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
        </Fragment>
    )
}
export default Shop;