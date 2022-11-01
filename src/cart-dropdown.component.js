import { Button } from './Button.component';
import { CartDropdownContext } from './context/cart-dropdown.context';
import { useContext } from 'react';
import CartItem from './cart-item.component';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';




const CartDropdown = () => {
    const { cartItems } = useContext(CartDropdownContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length ?
                        (cartItems.map((item) => {
                            return (<CartItem key={item.id} cartItem={item} />
                            )
                        })) : (<span className='empty-message'>Your Cart is Empty</span>)
                }
            </div>
            <Button buttontype='inverted' onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;