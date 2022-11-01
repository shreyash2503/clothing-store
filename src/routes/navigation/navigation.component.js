import React, { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { NavigationContainer, NavLink, NavLinksContainer, LogoContainer } from './navigation.styles';
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
            <NavigationContainer>
                <LogoContainer className='logo-container' to='/'>
                    <CrwLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink className='nav-link' to='/shop'>
                        SHOP
                    </NavLink >
                    {currentUser ? <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink> :
                        (<NavLink className='nav-link' to='/signIn'>SIGN IN</NavLink>)}

                    <CartIcon />
                </NavLinksContainer>
                {down && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )

}
export default Navigation;