import axios from 'axios';

export function getBg() {
  return axios.get('/bg', { responseType: 'blob' });
}
