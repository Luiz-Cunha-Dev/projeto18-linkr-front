import axios from "axios";
const BASE_URL = "https://api-linkr-0kjk.onrender.com/";
//const BASE_URL = "http://localhost:4000/";

function login(body) {
  return axios.post(`${BASE_URL}signin`, body);
}

function logout() {
  localStorage.removeItem("linkr");
}

function signUp(body) {
  return axios.post(`${BASE_URL}signup`, body);
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

export { login, logout, signUp, createPost, getPosts, deletePost };

/*

*/
