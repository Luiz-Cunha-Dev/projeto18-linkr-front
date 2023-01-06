import axios from "axios";
const BASE_URL =
  'https://api-linkr-0kjk.onrender.com/';


function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (auth === null) return;
  return auth.token;
}

function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

function logout() {
  localStorage.removeItem("linkr");
}

function signUp(body) {
  return axios.post(`${BASE_URL}/sign-up`, body);
}

function getUser() {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${BASE_URL}users`, config);
}

function createPost(body) {
  return axios.post(`${BASE_URL}/timeline`, body);
}

function getPosts() {
  return axios.get(`${BASE_URL}/timeline`);
}

export { getToken, login, logout, signUp, getUser, createPost, getPosts };
