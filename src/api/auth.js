import axios from '../utils/axios';

export function login(username, password) {
  return axios.get('/api/auth/login', {
    params: {
      username,
      password,
    },
  });
}

export function register(username, password, confirmPassword) {
  return axios.post('/api/auth/register', {
    username,
    password,
    confirmPassword,
  });
}

