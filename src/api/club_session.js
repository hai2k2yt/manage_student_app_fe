import axios from '../utils/axios';

export async function getAllClubSessions() {
  return axios.get('/club-session/all');
}

export async function getClubSessions(params) {
  return axios.get('/club-session', {
    params
  });
}

export async function storeClubSession(params) {
  return axios.post('/club-session', params);
}

export async function showClubSession(id) {
  return axios.get(`/club-session/${id}`);
}

export async function updateClubSession(id, params) {
  return axios.put(`/club-session/${id}`, params)
}

export async function destroyClubSession(id) {
  return axios.delete(`/club-session/${id}`)
}

export async function getSessionByClub(id, params) {
  return axios.get(`/club-session/club/${id}`, {
    params
  })
}