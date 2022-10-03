import { createContext, useState, useEffect } from "react";
import React from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
//as the actual value you want ot access;
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

})
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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

