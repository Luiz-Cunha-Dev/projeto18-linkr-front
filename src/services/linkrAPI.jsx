import axios from "axios";
//const BASE_URL = "https://api-linkr-0kjk.onrender.com/";
const BASE_URL = "http://localhost:4000/";

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (auth === null) return;
  return auth.token;
}

function login(body) {
  return axios.post(`${BASE_URL}signin`, body);
}

function logout() {
  localStorage.removeItem("linkr");
}

function signUp(body) {
  return axios.post(`${BASE_URL}signup`, body);
}

function getUser() {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${BASE_URL}users`, config);
}

function createPost(body, config) {
  return axios.post(`${BASE_URL}timeline`, body, config);
}

function getPosts() {
  return axios.get(`${BASE_URL}timeline`);
}

function deletePost(postid) {
  const token = localStorage.getItem("localToken");

  console.log("postid e token no service", postid, token);

  return axios.delete(`${BASE_URL}timeline`, {
    headers: {
      Authorization: `Bearer ${token}`,
      postid: postid,
    },
  });
}

export {
  getToken,
  login,
  logout,
  signUp,
  getUser,
  createPost,
  getPosts,
  deletePost,
};

/*

*/
