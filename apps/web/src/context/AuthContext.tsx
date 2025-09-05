/**
 * Authentication context to manage user state and authentication logic
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
  getRefreshToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on app load
    const savedToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setAccessToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User, token: string, refreshToken: string) => {
    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isLoggedIn: !!accessToken,
    login,
    logout,
    updateAccessToken,
    getRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
