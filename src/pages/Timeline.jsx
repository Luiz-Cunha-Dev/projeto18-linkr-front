import styled from "styled-components";
import React from "react";
import CreatePost from "../components/CreatePost.jsx";
import Header from "../components/header.jsx";
import Post from "../components/Post.jsx";

export default function Timeline() {
  return (
    <Wraper>
      <Header />
      <h1>timeline</h1>
      <CreatePost />
      <Post />

    </Wraper>
  );
}

const Wraper = styled.div`
  font-family: "Oswald", sans-serif;
  color: #ffffff;
  font-size: 43px;
  font-weight: 700px;
`;
