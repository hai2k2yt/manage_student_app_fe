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

