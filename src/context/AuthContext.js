import { React, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import {createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset
        } from "firebase/auth"

const authContext = createContext()

export const useAuth = () => useContext(authContext)

const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return () => {
            unsub()
        }
    }, [])

    const register = (email, password) => {
        return createUserWithEmailAndPassword (auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const logout = () => {
        return signOut(auth)
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, 
            {url: "http://localhost:3000/signin"}
        )
    }

    const resetPassword = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    return (
        <authContext.Provider value = {{
            currentUser,
            register,
            login,
            logout,
            forgotPassword,
            resetPassword
        }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;
