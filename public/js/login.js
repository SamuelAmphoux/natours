/* eslint-disable*/
axios.defaults.withCredentials = true;
const baseUrl = 'http://localhost:3000';
const api = '/api/v1';
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${baseUrl}${api}/users/login`,
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (err) {
    console.error(err.response.data);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
