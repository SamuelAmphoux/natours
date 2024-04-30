/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

axios.defaults.withCredentials = true;
// const baseUrl = 'http://localhost:3000';
const api = '/api/v1';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'data' ? 'updateMe' : 'updatePassword';
    const res = await axios({
      method: 'PATCH',
      url: `/${api}/users/${url}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `Successuflly updated ${type.toUpperCase()}!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
