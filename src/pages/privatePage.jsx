import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header.jsx";
import Post from "../components/Post.jsx";
import Trending from "../components/Trending.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import userContext from "../contexts/userContexts.jsx";

export default function Timeline() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [follow, setFollow] = useState(false);
  const token = localStorage.getItem("localToken");
  const [statusButton, setStatusButton] = useState(false)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getFollowInformation()
    getPosts()
  }, [id]);

  function getFollowInformation(){
    console.log(userId);
    const URL = `https://api-linkr-0kjk.onrender.com/follows/${id}`;

    axios
      .get(URL, config)
      .then((res) => {
        console.log(res);
        if(res.data === ""){
          setFollow(false)
        }else{
          setFollow(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPosts(){
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
  }

  function startFollowing(){
    setStatusButton(true)
    const URL = `https://api-linkr-0kjk.onrender.com/follows/${id}`;

    axios
      .post(URL, {}, config)
      .then((res) => {
        console.log(res);
        setFollow(true)
        setStatusButton(false)
      })
      .catch((err) => {
        console.log(err);
        alert("the operation failed")
        setStatusButton(false)
      });
  }

  function stopFollowing(){
    setStatusButton(true)
    const URL = `https://api-linkr-0kjk.onrender.com/follows/${id}`;

    axios
      .delete(URL, config)
      .then((res) => {
        console.log(res);
        setFollow(false)
        setStatusButton(false)
      })
      .catch((err) => {
        console.log(err);
        alert("the operation failed")
        setStatusButton(false)
      });
  }

  return (
    <>
      <Header />
      <Wraper hidden={userId === id ? "none" : "initial"} backColor={follow === false ? "#1877f2" : "#ffffff"} wordColor={follow === false ? "#ffffff" : "#1877f2"}>
        <div className="title">
          <img src={userData.pictureUrl} alt="profilePicture" />
          <h1>{userData.username}’s posts</h1>
        </div>
        <div className="principal">
          <div className="posts">
            <Post />
          </div>
          <div className="trending" >
            <Trending />
            <button disabled={statusButton} onClick={follow === false ? startFollowing : stopFollowing}>{follow === false ? "Follow" : "Unfollow"}</button>
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
      margin-bottom: 20px;
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

    .trending {
      margin-top: -85px;
      position: relative;
      button {
        position: absolute;
        width: 112px;
        height: 31px;
        right: 0px;
        top: 0px;
        background: ${props => props.backColor};
        border-radius: 5px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: ${props => props.wordColor};
        display: ${props => props.hidden};
        cursor: pointer;
        @media (max-width: 614px) {
          width: 90px;
          height: 25px;
        top: 40px;
        right: 20px;
      }
      }
    }
  }
`;
