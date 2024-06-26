import axios from '../utils/axios';
export async function statisticOverall() {
  return axios.get('/statistic/overall');
}

export async function statisticStudentFee(params) {
  return axios.get('/statistic/student-fee', { params });
}

export async function statisticTeacherFee(params) {
  return axios.get('/statistic/teacher-fee', { params });
}
