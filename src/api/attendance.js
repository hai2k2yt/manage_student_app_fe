import axios from '../utils/axios';

export async function getAllAttendances() {
  return axios.get('/attendance/all');
}

export async function getAttendances(params) {
  return axios.get('/attendance', {
    params
  });
}

export async function storeAttendance(params) {
  return axios.post('/attendance', params);
}

export async function updateAttendance(id, params) {
  return axios.put(`/attendance/${id}`, params)
}

export async function destroyAttendance(id) {
  return axios.delete(`/attendance/${id}`)
}

export async function getAttendanceBySession(id) {
  return axios.get(`/attendance/club-session/${id}`)
}

export async function updateManyAttendances(sessionId, params) {
  return axios.put(`/attendance/update-many/${sessionId}`, params)
}

export async function statisticStudentAttendances(clubId, studentId) {
  return axios.put(`/attendance/club/${clubId}/student/${studentId}`)
}