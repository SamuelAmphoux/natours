/*eslint-disable*/
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const settingsForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);
  const mapToken = mapEl.dataset.mapToken;

  displayMap(locations, mapToken);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    if (email && password) login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    logout();
  });
}

if (settingsForm) {
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    const email = document.getElementById('email')?.value;
    const name = document.getElementById('name')?.value;
    const photo = document.getElementById('photo')?.files[0];
    if (email) form.append('email', email);
    if (name) form.append('name', name);
    if (photo) form.append('photo', photo);
    if (email && name) updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating';

    const password = document.getElementById('password-current')?.value;
    const newPassword = document.getElementById('password')?.value;
    const newPasswordConfirm =
      document.getElementById('password-confirm')?.value;
    if (password && newPassword && newPasswordConfirm) {
      await updateSettings(
        { password, newPassword, newPasswordConfirm },
        'password',
      );

      userPasswordForm.reset();
      document.querySelector('.btn--save-password').textContent =
        'Save password';
    }
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
