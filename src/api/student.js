import axios from '../utils/axios';

export async function getAllStudents() {
  return axios.get('/student/all');
}

export async function getStudents(params) {
  return axios.get('/student', {
    params
  });
}

export async function getStudentsByParentCode(user_id) {
  return axios.get(`/student/parent/${user_id}`);
}

export async function storeStudent(params) {
  return axios.post('/student', params);
}

export async function showStudent(id) {
  return axios.get(`/student/${id}`);
}

export async function updateStudent(id, params) {
  return axios.put(`/student/${id}`, params)
}

export async function destroyStudent(id) {
  return axios.delete(`/student/${id}`)
}