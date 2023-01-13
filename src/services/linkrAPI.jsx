import axios from "axios";
const BASE_URL = "https://api-linkr-0kjk.onrender.com/";
//const BASE_URL = "http://localhost:4000/";

function login(body) {
  return axios.post(`${BASE_URL}signin`, body);
}

function logout() {
  localStorage.removeItem("localToken");
}

function signUp(body) {
  return axios.post(`${BASE_URL}signup`, body);
}

function getToken() {
  const dateNow = new Date();
  const auth = (localStorage.getItem("localToken"));
  
  if (dateNow - auth?.date > 86400000) {
    logout();
    return null;
  }
}

function createPost(body, config) {
  return axios.post(`${BASE_URL}timeline`, body, config);
}

function getPosts() {
  return axios.get(`${BASE_URL}timeline`);
}

function getPostsLimit({limit=10, offset=0}) {
  const token = getToken();
  const config = { header: { Authorization: `Bearer ${token}` } };

  return axios.get(`${BASE_URL}timeline?limit=${limit}&offset=${offset}`, config);
}

function getPageUser({id, limit=10, offset=0}) {
  const token = getToken();
  const config = { header: { Authorization: `Bearer ${token}` } };

  return axios.get(`${BASE_URL}timeline/${id}?limit=${limit}&offset=${offset}`, config);
}

function getPostsById(id) {
  return axios.get(`${BASE_URL}timeline/${id}`);
}

function getUsersList(string) {
  const token = getToken();
  const config = { header: { Authorization: `Bearer ${token}` } };

  return axios.get(`${BASE_URL}${string}`, config);
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
  login,
  logout,
  signUp,
  createPost,
  getPosts,
  deletePost,
  getPostsById,
  getPostsLimit,
  getPageUser,
  getUsersList,
};
