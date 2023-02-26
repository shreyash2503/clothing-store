import React from 'react';
import { auth, SignInWithGooglePopup, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils.js';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUp from '../../signUp.js';
import Sign from './Sign.js';
import './sign-in.component.scss';


const SignIn = () => {
    //This useEffect is for login using redirect
    useEffect(() => {
        const response = getRedirectResult(auth);
        if (response) {
            createUserDocumentFromAuth(response.user);
        }
        console.log(response)
    })
    const logGoogleUser = async () => {
        await SignInWithGooglePopup();
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