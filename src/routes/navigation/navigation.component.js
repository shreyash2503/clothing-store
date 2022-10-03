import React, { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss'
import { ReactComponent as CrwLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';
import CartIcon from '../../cart-icon.component';
import CartDropdown from '../../cart-dropdown.component';
import { CartDropdownContext } from '../../context/cart-dropdown.context';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { down } = useContext(CartDropdownContext);
    const signOutHandler = async () => {
        await signOutUser();
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/home'>
                    <CrwLogo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link >
                    {currentUser ? <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span> :
                        (<Link className='nav-link' to='/signIn'>SIGN IN</Link>)}

                    <CartIcon />
                </div>
                {down && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )

}
export default Navigation;