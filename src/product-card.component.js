import './product-card.styles.scss';
import Button from './Button.component';

import { CartDropdownContext } from './context/cart-dropdown.context';
import React from 'react'
import { useContext } from 'react';

export const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartDropdownContext);
    const { name, price, imageUrl } = product;
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={() => addItemToCart(product)}>Add to Cart</Button>
        </div>
    )
}
