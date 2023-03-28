import React from 'react'
import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';
//import { CartDropdownContext } from './context/cart-dropdown.context';
import { useSelector } from 'react-redux';
//import { useContext } from 'react';
import { selectCartItems, selectIsCartOpen } from './store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from './store/cart/cart.action';

const CartIcon = () => {
    //const { down, setdown, cartItems } = useContext(CartDropdownContext);
    const cartItems = useSelector(selectCartItems);
    const down = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();


    const toggle = () => {
        //setdown(!down);
        dispatch(setIsCartOpen(!down));
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