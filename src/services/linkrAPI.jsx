import axios from 'axios';
const BASE_URL =
  'https://api-linkr-0kjk.onrender.com/';

function getToken() {
  const auth = JSON.parse(localStorage.getItem('linkr'));
  if (!auth) {
    return false;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  return config;
}

function login(body) {
  return axios.post(`${BASE_URL}/`, body);
}

function logout() {
  localStorage.removeItem('linkr');
}

function signUp(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function getUser() {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${BASE_URL}users`, config);
}

export { getToken, login, logout, signUp, getUser };