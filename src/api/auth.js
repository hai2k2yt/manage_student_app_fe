import axios from '../utils/axios';

export async function loginUser(username, password) {
  return axios.post('/auth/login', {
    username,
    password,
  });
}

export async function registerUser(username, password, confirmPassword) {
  return axios.post('/auth/register', {
    username,
    password,
    confirmPassword,
  });
}

export async function forgotPasswordUser(username) {
  return axios.post('/auth/forgot-password', {
    username,
  });
}

