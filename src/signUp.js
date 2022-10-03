import { useState } from "react";
import FormInput from "./form-input.component";
import './sign-up-form.styles.scss';
import Button from './Button.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    console.log(formFields);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        if (password !== confirmPassword) {
            alert("Password do not match, Please check confirm Password and try again");

        }
        else {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                setFormFields(defaultFormFields);
                await createUserDocumentFromAuth(user, { displayName });
            }
            catch (error) {
                console.error(error);
                alert(error.message);
            }
        }

    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <form action="" onSubmit={handleSubmit}>
                {/* Controlled components in React */}
                <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName} />
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password} />
                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
};
export default SignUp;