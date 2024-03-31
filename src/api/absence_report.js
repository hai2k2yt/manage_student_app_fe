import axios from '../utils/axios';

export async function getAllAbsenceReports() {
  return axios.get('/absence-report/all');
}

export async function getAbsenceReports(params) {
  return axios.get('/absence-report', {
    params
  });
}

export async function storeAbsenceReport(params) {
  return axios.post('/absence-report', {
    params
  });
}

export async function updateAbsenceReport(id, params) {
  return axios.put(`/absence-report/${id}`, {
    params
  })
}

export async function destroyAbsenceReport(id) {
  return axios.delete(`/absence-report/${id}`)
}

export async function getAbsenceReportBySession(id) {
  return axios.get(`/absence-report/session/${id}`)
}