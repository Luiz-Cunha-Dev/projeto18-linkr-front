import styled from "styled-components";
import React from "react";
import Header from "../components/header.jsx";
import PostsHashtag from "../components/PostsHashtag.jsx";
import Trending from "../components/Trending.jsx";
import { useParams } from "react-router-dom";

export default function HashtagPage() {

    const {hashtag} = useParams()

  return (
    <Wraper>
      <Header />
      <MainPage>
        <Scrolling>
          <h1 className="h1_top">#{hashtag}</h1>
          <PostsHashtag hash={hashtag}/>
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
  position: relative;
  margin-right: 0px;

`;

const MainPage = styled.div`
display: flex;
justify-content: center;
.h1_top{
    margin-bottom: 43px;
    @media (max-width: 614px) {
      width: 100%;
      margin-bottom: 19px;
      margin-top: 5px;
      padding-left: 5%;
  }
  }
  @media (max-width: 614px) {
      justify-content: flex-start;
      margin-bottom: 19px;
  }
`;

const Scrolling = styled.div``;
