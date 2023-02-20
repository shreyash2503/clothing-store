import React from 'react';
import { useContext } from 'react';
import './checkout.styles.scss';
//import { CartDropdownContext } from './context/cart-dropdown.context';
import CheckoutItem from './checkout-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from './store/cart/cart.selector';

const Checkout = () => {
    //const { cartItems } = useContext(CartDropdownContext);
    const cartItems = useSelector(selectCartItems)
    // const total = cartItems.reduce((total, item) => {
    //     return total + item.quantity * item.price
    // }, 0);
    const total = useSelector(selectCartTotal);
    return (
        <div className='checkout-container'>
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Despcription</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem cartItem={cartItem} key={cartItem.id} />
                )
            })}
            <span className='total'>Total::<span>{total}</span></span>
        </div>
    )
}

export default Checkout;