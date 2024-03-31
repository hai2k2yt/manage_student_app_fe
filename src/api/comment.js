import axios from '../utils/axios';

export async function getAllComments() {
  return axios.get('/comment/all');
}

export async function getComments(params) {
  return axios.get('/comment', {
    params
  });
}

export async function storeComment(params) {
  return axios.post('/comment', {
    params
  });
}

export async function updateComment(id, params) {
  return axios.put(`/comment/${id}`, {
    params
  })
}

export async function destroyComment(id) {
  return axios.delete(`/comment/${id}`)
}

export async function getCommentBySession(id) {
  return axios.get(`/comment/club-session/${id}`)
}
