/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

axios.defaults.withCredentials = true;
const baseUrl = window.location.origin;
const api = '/api/v1';

export const login = async (email, password) => {
  try {
    const res = await axios({
      // method: 'POST',
      // url: `${baseUrl}/${api}/users/login`,
      method: 'GET',
      url: 'www.google.com',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${baseUrl}/${api}/users/logout`,
    });
    if (res.data.status === 'success') {
      if (location.pathname === '/me') {
        location.assign('/');
      } else {
        location.reload(true);
      }
    }
  } catch (err) {
    showAlert('error', 'Error logging out. Try again!');
  }
};
