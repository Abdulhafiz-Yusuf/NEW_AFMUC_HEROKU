import React, { createContext, useReducer } from 'react';
import userReducer from './rootReducer';

export const initialState = {
    user: null,
    result: null,
    error: null
}

export const globaltore = createContext(initialState);


const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <globaltore.Provider value={{ state, dispatch }}>
            {children}
        </globaltore.Provider>
    );

};

export default ContextProvider;