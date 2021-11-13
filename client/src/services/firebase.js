import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const myApp = firebase.initializeApp(firebaseConfig);
export const auth = myApp.auth();


/////THIS IS WAY TOO IS CORRECT
// firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();



import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = initializeApp(firebaseConfig)

export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
        return () => unsubscribe()
    }, [])
    return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null }
}



//yarn add react - redux - firebase firebase redux react - redux redux - thunk
