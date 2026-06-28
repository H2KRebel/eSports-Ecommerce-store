import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { user: currentUser } = await authApi.getMe();
        setUser(currentUser);
      } catch {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const saveSession = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const login = async (email, password) => {
    const { token, user: userData } = await authApi.login(email, password);
    saveSession(token, userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const { token, user: userData } = await authApi.register(name, email, password);
    saveSession(token, userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
