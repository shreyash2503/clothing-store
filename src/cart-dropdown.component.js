import './cart-dropdown.styles.jsx';
import { Button } from './Button.component';
import { CartDropdownContext } from './context/cart-dropdown.context';
import { useContext } from 'react';
import CartItem from './cart-item.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';




const CartDropdown = () => {
    const { cartItems } = useContext(CartDropdownContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                        (cartItems.map((item) => {
                            return (<CartItem key={item.id} cartItem={item} />
                            )
                        })) : (<EmptyMessage>Your Cart is Empty</EmptyMessage>)
                }
            </CartItems>
            <Button buttontype='inverted' onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;