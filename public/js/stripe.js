import axios from 'axios';
import { showAlert } from './alert';
const Stripe = require('stripe');

axios.defaults.withCredentials = true;
// const baseUrl = 'http://localhost:3000';
const api = '/api/v1';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/${api}/bookings/checkout-session/${tourId}`);
    // 2) Redirect to stripe's generated url
    if (session.data.session.url) self.location = session.data.session.url;
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
