import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx';
const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    return ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,

    }[buttonType]
    )
}


const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}
export { Button, BUTTON_TYPE_CLASSES };

//!Code before adding the styled components or css in js
// const BUTTON_TYPE_CLASSES = {
//
//     google: 'google-sign-in',
//     inverted: 'inverted'
// }

// const Button = ({ children, buttonType, ...otherProps }) => {
//     return (
//         <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
//             {children}
//         </button>
//     )
// }