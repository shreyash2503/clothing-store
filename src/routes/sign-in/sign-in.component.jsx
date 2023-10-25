import React from 'react';
import { auth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { onGoogleSignInStart } from '../../store/user/user.saga';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import SignUp from '../../signUp';
import Sign from './Sign';
import './sign-in.component.scss';
import { goolgeSignInStart } from '../../store/user/user.action';


const SignIn = () => {
    const dispatch = useDispatch();
    //This useEffect is for login using redirect
    useEffect(() => {
        const response = getRedirectResult(auth);
        if (response) {
            createUserDocumentFromAuth(response.user);

        }
        console.log(response)
    }, [])
    const logGoogleUser = async () => {
        dispatch(goolgeSignInStart());

    }
    const logGoogleRedirectUser = async () => {
        const response = await signInWithGoogleRedirect();
        console.log(response);
    }
    return (
        <div className='authentication-container'>
            <Sign googleSignIn={logGoogleUser} />
            <SignUp />
        </div>
    )
}
export default SignIn;