import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as authAPI from '../service/auth.service';
import { storage } from '../utils/storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => storage.getToken());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { token, ndaSigned } = await authAPI.login(credentials);
      console.log(token, ndaSigned);

      storage.setToken(token);
      setToken(token);

      return { ndaSigned };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.logout();
    setToken(null);
  }, []);

  const acceptNda = useCallback(async () => {
    setLoading(true);
    try {
      const { status } = await authAPI.acceptNda();
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }, [token])

  useEffect(() => {
    const existingToken = storage.getToken();
    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, loading, acceptNda }}>
      {children}
    </AuthContext.Provider>
  );
}
