import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (auth === null) return;
  return auth.token;
}

function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

function createPost(body) {
  return axios.post(`${BASE_URL}/timeline`, body);
}

function getPosts() {
  return axios.get(`${BASE_URL}/timeline`);
}

export { getToken, login, createPost, getPosts };
