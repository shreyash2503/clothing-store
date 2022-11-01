import React from 'react'
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';
import { CartDropdownContext } from './context/cart-dropdown.context';
import { useContext } from 'react';

const CartIcon = () => {
    const { down, setdown, cartItems } = useContext(CartDropdownContext);
    const toggle = () => {
        setdown(!down);
    }
    const quantity = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0)
    return (<CartIconContainer onClick={toggle}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCount>{quantity}</ItemCount>
    </CartIconContainer>)
}
export default CartIcon;