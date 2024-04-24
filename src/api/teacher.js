import axios from '../utils/axios';

export async function getAllTeachers() {
  return axios.get('/teacher/all');
}

