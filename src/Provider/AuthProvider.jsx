import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //console.log('AuthProvider user:', user);


    //Observe auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            //console.log('Auth state changed:', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount

    }, []);

    //logout function
    const logOut = () => {
        return signOut(auth);
    }

    //LogIn 
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Sign In
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        logIn,
        googleLogin,
        loading,
        setLoading
    };

    return <AuthContext value={authData}>
        {children}
        </AuthContext>

};

export default AuthProvider;