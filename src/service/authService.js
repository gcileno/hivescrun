// services/auth.service.js
import api from '../api/client';

export const register = async (data) => {
  const response = await api.post('/api/members/register/', data);

  const { access, refresh } = response.data;

  localStorage.setItem('@HiveScrum:token', access);
  localStorage.setItem('@HiveScrum:refresh', refresh);

  return response.data;
};

export const login = async (data) => {
  const response = await api.post('/api/authentication/authorize/', data);

  const { access, refresh } = response.data;

  localStorage.setItem('@HiveScrum:token', access);
  localStorage.setItem('@HiveScrum:refresh', refresh);

  return response.data;
};