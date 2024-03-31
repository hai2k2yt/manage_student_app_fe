import axios from '../utils/axios';

export async function getAllClasses() {
  return axios.get('/class/all');
}

export async function getClasses(params) {
  return axios.get('/class', {
    params
  });
}

export async function storeClass(params) {
  return axios.post(`/class`, {
    params
  });
}

export async function showClass(id) {
  return axios.get(`/class/${id}`);
}



export async function updateClass(id, params) {
  return axios.put(`/class/${id}`, {
    params
  })
}

export async function destroyClass(id) {
  return axios.delete(`/class/${id}`)
}

export async function assignStudentToClass(params) {
  return axios.post(`/class/assign-students`, {
    params
  })
}