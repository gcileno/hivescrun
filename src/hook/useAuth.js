// hooks/useAuth.js
import { useState } from 'react';
import * as authService from '../service/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleRegister = async (data) => {
    const res = await authService.register(data);
    setUser(res.user);
  };

  const handleLogin = async (data) => {
    const res = await authService.login(data);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return { user, handleRegister, handleLogin, logout };
};