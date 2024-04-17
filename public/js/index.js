/*eslint-disable*/
import { displayMap } from './mapbox';
import { login, logout } from './login';

// DOM ELEMENTS
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

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
