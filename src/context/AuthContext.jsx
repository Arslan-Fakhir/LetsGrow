import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ 
    user: null,
    loading: true,
    error: null
  });

  // Helper functions for role checking
  const hasRole = (role) => auth.user?.role === role;
  const isAdmin = () => hasRole('admin');
  const isEntrepreneur = () => hasRole('entrepreneur');
  const isInvestor = () => hasRole('investor');

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setAuth({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuth({
          user: null,
          loading: false,
          error: 'Failed to initialize authentication'
        });
      }
    };
    initializeAuth();
  }, []);

  const login = async (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setAuth({
        user: userData,
        loading: false,
        error: null
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuth(prev => ({
        ...prev,
        error: 'Failed to save user data'
      }));
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      // Clear any other auth-related items
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setAuth({ 
        user: null, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuth(prev => ({
        ...prev,
        error: 'Failed to clear authentication'
      }));
    }
  };

  const value = {
    auth,
    login,
    logout,
    hasRole,
    isAdmin,
    isEntrepreneur,
    isInvestor
  };

  return (
    <AuthContext.Provider value={value}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};