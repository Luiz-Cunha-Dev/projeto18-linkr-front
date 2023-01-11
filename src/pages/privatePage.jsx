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
  }, [id]);

  return (
    <>
      <Header />
      <Wraper>
        <div className="title">
          <img src={userData.pictureUrl} alt="profilePicture" />
          <h1>{userData.username}’s posts</h1>
        </div>
        <div className="principal">
          <div className="posts">
            <Post  />
          </div>
          <div className="trending">
          <Trending />
          </div>
        </div>
      </Wraper>
    </>
  );
}

const Wraper = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 614px) {
padding-top: 0px;
    }
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    word-break: break-all;
    width: 950px;
    @media (max-width: 614px) {
      width: 100%;
      padding-left: 4%;
      margin-top: 15px;
      margin-bottom: -20px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 26.5px;
      margin-right: 18px;
      @media (max-width: 614px) {
        width: 40px;
      height: 40px;
    }
    }
    h1 {
      font-family: "Oswald";
      font-style: normal;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      color: #ffffff;
      @media (max-width: 614px) {
        font-size: 28px;
line-height: 49px;
    }
    }
  }
  .principal {
    display: flex;
    width: 100%;
    margin-top: 41px;
    justify-content: center;

    .trending{
      margin-top: -85px;
    }
  }
`;
