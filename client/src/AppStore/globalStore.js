import React, { createContext, useReducer } from 'react';
import userReducer from './rootReducer';

export const initialState = {
    user: null,
    result: null,
    error: null
}

export const globalStore = createContext(initialState);


const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <globalStore.Provider value={{ state, dispatch }}>
            {children}
        </globalStore.Provider>
    );

};

export default ContextProvider;