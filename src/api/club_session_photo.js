import axios from '../utils/axios';

export async function getAllClubSessionPhotos() {
  return axios.get('/club-session-photo/all');
}

export async function getClubSessionPhotos(params) {
  return axios.get('/club-session-photo', {
    params,
  });
}

export async function storeClubSessionPhoto(params) {
  return axios.post('/club-session-photo', params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updateClubSessionPhoto(id, params) {
  return axios.put(`/club-session-photo/${id}`, params);
}

export async function destroyClubSessionPhoto(id) {
  return axios.delete(`/club-session-photo/${id}`);
}

export async function getClubSessionPhotoByClub(id) {
  return axios.get(`/club-session-photo/club/${id}`);
}

export async function getClubSessionPhotoBySession(id) {
  return axios.get(`/club-session-photo/club-session/${id}`);
}
