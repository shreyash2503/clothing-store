import { useContext } from "react";
import { ProductContext } from "../../context/product.context";
import { ProductCard } from "../../product-card.component";
import './shop.syles.scss';
const Shop = () => {
    const { product } = useContext(ProductContext);
    return (
        <div className="products-container">
            {product.map((product) => {
                return (
                    <ProductCard key={product.id} product={product} />
                )

            })}
        </div>
    )
}
export default Shop;