import { createContext, useEffect, useReducer } from "react";
import React from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//as the actual value you want ot access;
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`Unhandled type ${type} in userReducer`);

    }
}
const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);
    const reducer = useReducer(userReducer, INITIAL_STATE);
    console.log(`the reducer is `);
    console.log(reducer);
    const [state, dispatch] = reducer;
    console.log(state);
    const { currentUser } = state;
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    }
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user);
        });
        return unsubscribe; //-----> This is an example of a useEffect cleanup function

    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/*
<UserProvider>
    <App />--------->children of the user provider will be passed like props
</UserProvider>
*/

