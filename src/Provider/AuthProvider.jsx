import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    // Fetch role from backend
    const getUserRole = async (email) => {
        try {
            const res = await fetch(`http://localhost:4000/users/role/${email}`);
            const data = await res.json();
            setRole(data.role || null);
        } catch (err) {
            console.log("Role fetch error:", err);
        }
    };

    
    // Observe auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                await getUserRole(currentUser.email);
            } else {
                setRole(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logOut = () => signOut(auth);
    const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        logIn,
        googleLogin,
        loading,
        setLoading,
        role
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
