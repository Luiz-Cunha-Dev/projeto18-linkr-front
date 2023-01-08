import styled from "styled-components";
import React from "react";
import CreatePost from "../components/CreatePost.jsx";
import Header from "../components/header.jsx";
import Post from "../components/Post.jsx";
import Trending from "../components/Trending.jsx";

export default function Timeline() {
  return (
    <Wraper>
      <Header />
      <MainPage>
        <Scrolling>
          <h1 className="h1_top">timeline</h1>
          <CreatePost />
          <Post />
          <Post />
          <Post />
          <Post />
        </Scrolling>
        <Trending />
      </MainPage>
    </Wraper>
  );
}

const Wraper = styled.div`
  font-family: "Oswald", sans-serif;
  color: #ffffff;
  font-size: 43px;
  font-weight: 700px;
  margin-top: 72px;
  .h1_top{
    margin-bottom: 43px;
  }
`;

const MainPage = styled.div`
display: flex;
justify-content: center;
`;

const Scrolling = styled.div``;
