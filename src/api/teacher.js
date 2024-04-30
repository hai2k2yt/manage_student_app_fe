import axios from '../utils/axios';

export async function getAllTeachers() {
  return axios.get('/teacher/all');
}

export async function showTeacherByUserId(user_id) {
  return axios.get(`/teacher/user-id/${user_id}`);
}

