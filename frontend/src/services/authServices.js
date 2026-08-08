import API from './api';

export const loginUser = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data;
};

export const signupUser = async (name, email, password) => {
  const res = await API.post('/auth/signup', { name, email, password });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await API.get('/auth/me');
  return res.data;
};