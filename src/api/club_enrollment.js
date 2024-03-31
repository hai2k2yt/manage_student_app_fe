import axios from '../utils/axios';

export async function getAllClubEnrollments() {
  return axios.get('/club-enrollment/all');
}

export async function getClubEnrollments(params) {
  return axios.get('/club-enrollment', {
    params
  });
}

export async function storeClubEnrollment(params) {
  return axios.post('/club-enrollment', {
    params
  });
}

export async function destroyClubEnrollment(id) {
  return axios.delete(`/club-enrollment/${id}`)
}