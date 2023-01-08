import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Post from "../components/Post.jsx";
import Trending from "../components/Trending.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Timeline() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const URL = `https://api-linkr-0kjk.onrender.com/user/${id}`;

    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        setUserData({
          username: res.data.username,
          pictureUrl: res.data.pictureUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <Wraper>
        <div className="title">
          <img src={userData.pictureUrl} alt="profilePicture" />
          <h1>{userData.username}</h1>
        </div>
        <div className="principal">
          <div className="posts">
            <Post  />
          </div>
          <Trending />
        </div>
      </Wraper>
    </>
  );
}

const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15%;
  padding-top: 30px;
  .title {
    display: flex;
    align-items: center;
    @media (max-width: 614px) {
      align-items: flex-start;
      margin-left: -30px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
      margin-right: 18px;
    }
    h1 {
      font-family: "Oswald";
      font-style: normal;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      color: #ffffff;
    }
  }
  .principal {
    display: flex;
    margin-top: 41px;
    .posts {
      margin-right: 25px;
    }
  }
`;
