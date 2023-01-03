import axios from "axios";

const BASE_URL = "http://localhost:5000/";

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  return auth?.token;
}

function login(body) {
  return axios.post(`${BASE_URL}/sign-in`, body);
}

export { getToken, login };