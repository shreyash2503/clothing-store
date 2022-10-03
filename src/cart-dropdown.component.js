import './cart-dropdown.styles.scss';
import Button from './Button.component';
import { CartDropdownContext } from './context/cart-dropdown.context';
import { useContext } from 'react';
import CartItem from './cart-item.component';
const CartDropdown = () => {
    const { cartItems } = useContext(CartDropdownContext)
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items" >
                {cartItems.map((item) => {
                    return (<CartItem key={item.id} cartItem={item} />
                    )
                })}
            </div>
            <Button buttontype='inverted'>CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;