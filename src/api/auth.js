import axios from '../utils/axios';

export async function loginUser(username, password) {
  return axios.post('/auth/login', {
    username,
    password,
  });
}

export async function registerUser(params) {
  return axios.post('/auth/register',
    params,
  );
}

export async function forgotPasswordUser(username) {
  return axios.post('/auth/forgot-password', {
    username,
  });
}

export async function getAuthUser() {
  return axios.get('/auth/me');
}

