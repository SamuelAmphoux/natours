/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

axios.defaults.withCredentials = true;
const baseUrl = window.location.origin;
const api = '/api/v1';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${baseUrl}${api}/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
