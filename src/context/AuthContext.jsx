import React, { createContext, useState, useContext, useEffect } from 'react';

// Create authentication context
export const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * @returns {Object} Auth context with auth state and methods
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * AuthProvider component that manages authentication state
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider wrapper
 */
export const AuthProvider = ({ children }) => {
    // Authentication state
    const [auth, setAuth] = useState({ 
        user: null, 
        loading: true 
    });

    // Check for existing user on initial render
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setAuth({ 
                user, 
                loading: false 
            });
        } else {
            setAuth({ 
                user: null, 
                loading: false 
            });
        }
    }, []);

    /**
     * Login function to set authenticated user
     * @param {Object} userData - User data to store
     */
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({ 
            user: userData, 
            loading: false 
        });
    };

    /**
     * Logout function to clear authentication
     */
    const logout = () => {
        localStorage.removeItem('user');
        setAuth({ 
            user: null, 
            loading: false 
        });
    };

    // Context value containing state and methods
    const value = {
        auth,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Only render children when not loading */}
            {!auth.loading && children}
        </AuthContext.Provider>
    );
};