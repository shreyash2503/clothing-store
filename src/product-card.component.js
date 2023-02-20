import './product-card.styles.scss';
import { Button, BUTTON_TYPE_CLASSES } from './Button.component';

//import { CartDropdownContext } from './context/cart-dropdown.context';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
//import { useContext } from 'react';
import { addItemToCart } from './store/cart/cart.action';
import { selectCartItems } from './store/cart/cart.selector';

export const ProductCard = ({ product }) => {
    //const { addItemToCart } = useContext(CartDropdownContext);
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();

    const { name, price, imageUrl } = product;
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">₹{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => dispatch(addItemToCart(cartItems, product))}>Add to Cart</Button>
        </div>
    )
}
