import axios from '../utils/axios';

export async function getAllUser() {
  return axios.get('/user/all');
}

export async function getUser(params) {
  return axios.get('/user', {
    params
  });
}

export async function showUser(id) {
  return axios.get(`/user/${id}`);
}

export async function updateUser(id, params) {
  return axios.post(`/user/${id}`, params);
}

export async function updateProfile(params) {
  return axios.post(`/auth/profile`, params);
}

