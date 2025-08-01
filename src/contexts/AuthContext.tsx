import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Check authentication status on mount and when window gains focus
  useEffect(() => {
    checkAuth();
    
    // Listen for window focus to check if session still exists
    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const checkAuth = (): boolean => {
    try {
      const sessionToken = sessionStorage.getItem('token');
      if (sessionToken) {
        const parsedToken = JSON.parse(sessionToken);
        if (parsedToken && parsedToken.token) {
          setIsAuthenticated(true);
          setToken(parsedToken.token);
          return true;
        }
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
    
    // Clear invalid session
    logout();
    return false;
  };

  const login = (tokenData: string) => {
    try {
      const parsedToken = JSON.parse(tokenData);
      sessionStorage.setItem('token', tokenData);
      setIsAuthenticated(true);
      setToken(parsedToken.token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}; 