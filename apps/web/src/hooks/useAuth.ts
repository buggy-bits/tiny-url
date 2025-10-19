import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const authenticated = authService.isAuthenticated();
    setUser(currentUser);
    setIsAuthenticated(authenticated);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, logout };
};
