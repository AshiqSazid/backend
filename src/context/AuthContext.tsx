"use client";

import React, { createContext, useContext, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
// Define the shape of your AuthContext
const defaultAuthContext = {
    isAuthenticated: false,
    userInfo: {
        name: '',
        email: '',
    },
    handleSetLoginInfo: (userInfo: any) => { },
    handleRemoveLoginInfo: () => { },
};

// Create the context with default values
export const AuthContext = createContext(defaultAuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
    });

    const handleSetLoginInfo = (userInfo: any) => {
        secureLocalStorage.setItem('@userInfo', JSON.stringify(userInfo));
        setIsAuthenticated(true);
        setUserInfo(userInfo);
    };

    const handleRemoveLoginInfo = () => {
        setIsAuthenticated(false);
        setUserInfo({
            name: '',
            email: '',
        });
    };

    useEffect(() => {
        const token = secureLocalStorage.getItem('@authToken');
        if (token) {
            setIsAuthenticated(true);
        }
        const userString = secureLocalStorage.getItem('@userInfo');
        const user = typeof userString === 'string' ? JSON.parse(userString) : null;
        if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
            });
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userInfo,
                handleSetLoginInfo,
                handleRemoveLoginInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export function useAuthContext() {
    return useContext(AuthContext); // Return the full AuthContext
}

// Example usage to specifically get userInfo (optional)
export function useUserInfo() {
    const { userInfo } = useContext(AuthContext); // Extract userInfo from context
    return userInfo;
}


