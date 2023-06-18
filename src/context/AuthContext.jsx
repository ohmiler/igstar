import React, { createContext, useContext, useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState({});

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        })

        return () => {
            unsubscribe();
        }

    }, [])

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
        {children}
    </AuthContext.Provider>
  )
}

export function useUserAuth() {
    return useContext(AuthContext);
}