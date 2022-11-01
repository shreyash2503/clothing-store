import React, { useState, useContext } from 'react';
import FormInput from '../../form-input.component';
import { signIn } from '../../utils/firebase/firebase.utils';
import './sign.styles.scss'
import { Button, BUTTON_TYPE_CLASSES } from '../../Button.component';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const defaultFields = {
    email: "",
    password: "",
    displayName: "",
    confirmPassword: ""
}

const Sign = ({ googleSignIn }) => {
    const [fields, setFields] = useState(defaultFields)
    const { email, password, displayName } = fields;
    console.log(`Hey you called me agian::`);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields({ ...fields, [name]: value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email === "" || password === "") {
            alert("Please fill all the fields");
        }
        else {
            try {
                const { user } = await signIn(email, password);
                console.log(user);
                await createUserDocumentFromAuth(user, { displayName })
                console.log(`This is the user data from Sign.js`);
                setFields(defaultFields);
            }
            catch (error) {
                if (error.code === 'auth/wrong-password') {
                    alert("Incorrect Password");
                }
                else if (error.code === 'auth/user-not-found') {
                    alert("No user associated with this email");
                }
                console.log(error);
            }
        }
    }
    return (
        <div className='signIn-Form'>
            <h2>I already have an account</h2>
            <p>Sign In with your email and password</p>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password} />
                <div className='button-contain'>
                    <Button type="submit" >Sign In</Button>
                    <Button type='button' onClick={googleSignIn} buttonType={BUTTON_TYPE_CLASSES.google}>Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
}
export default Sign;