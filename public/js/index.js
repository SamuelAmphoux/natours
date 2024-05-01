/*eslint-disable*/
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
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
    const button = loginForm.querySelector('.btn');
    button.textContent = 'Processing...';

    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    if (email && password) login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = signupForm.querySelector('.btn');
    button.textContent = 'Processing...';

    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const passwordConfirm = document.getElementById('password-confirm')?.value;
    if (name && email && password && passwordConfirm)
      signup(name, email, password, passwordConfirm);
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
    const button = settingsForm.querySelector('.btn');
    button.textContent = 'Processing...';

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
    const button = userPasswordForm.querySelector('.btn');
    button.textContent = 'Processing...';

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
