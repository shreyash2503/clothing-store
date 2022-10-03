import React from 'react'
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from './assets/shopping-bag.svg';
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
    return (<div className='cart-icon-container' onClick={toggle}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{quantity}</span>
    </div>)
}
export default CartIcon;