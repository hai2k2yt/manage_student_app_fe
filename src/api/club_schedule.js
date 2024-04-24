import axios from '../utils/axios';

export async function getAllClubSchedules() {
  return axios.get('/club-schedule/all');
}

export async function getClubSchedules(params) {
  return axios.get('/club-schedule', {
    params,
  });
}

export async function storeClubSchedule(params) {
  return axios.post('/club-schedule', params);
}

export async function showClubSchedule(id) {
  return axios.get(`/club-schedule/${id}`);
}

export async function updateClubSchedule(id, params) {
  return axios.put(`/club-schedule/${id}`, params);
}

export async function destroyClubSchedule(id) {
  return axios.delete(`/club-schedule/${id}`);
}

export async function getScheduleByClub(id) {
  return axios.get(`/club-schedule/club/${id}`);
}