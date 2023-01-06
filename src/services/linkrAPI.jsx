import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (auth === null) return;
  return auth.token;
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