import axios from '../utils/axios';

export async function getAllClubs() {
  return axios.get('/club/all');
}

export async function getClubs(params) {
  return axios.get('/club', {
    params
  });
}

export async function storeClub(params) {
  return axios.post('/club', {
    params
  });
}

export async function showClub(id) {
  return axios.get(`/club/${id}`);
}

export async function updateClub(id, params) {
  return axios.put(`/club/${id}`, {
    params
  })
}

export async function destroyClub(id) {
  return axios.delete(`/club/${id}`)
}

export async function getClubStudents(id) {
  return axios.get(`/club/${id}/students`)
}