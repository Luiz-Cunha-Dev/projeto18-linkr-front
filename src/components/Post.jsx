import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../images/profilepic.png";
import { getPosts } from "../services/linkrAPI.jsx";
import { IoHeartOutline, IoHeart, IoPencil, IoTrash } from "react-icons/io5";

export default function Post() {
  const [curtida, setCurtida] = useState("IoHeartOutline");

  function curtir() {
    console.log("entrou em curtir");
    if (curtida === "IoHeartOutline") {
      setCurtida("IoHeart");
      console.log("curtiu");
    } else {
      setCurtida("IoHeartOutline");
      console.log("descurtiu");
    }
  }

  return (
    <Wraper>
      <ProfilePicture>
        <img src={ProfilePic} alt="" />
        <div onClick={curtir}>
          {curtida === "IoHeart" ? (
            <IoHeart size={30} />
          ) : (
            <IoHeartOutline size={30} />
          )}
        </div>
      </ProfilePicture>
      <Content>
        <div className="name_icons">
          <h1>Name</h1>
          <div>
            <IoPencil size={25} className="Pencil"/>
            <IoTrash size={25} className="Trash"/>
          </div>
        </div>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
          #react #material
        </h2>
        <Link>
          <div>
            <h1>title</h1>
            <h2>description</h2>
            <h3>url</h3>
          </div>
          <img src="image" alt="" />
        </Link>
      </Content>
    </Wraper>
  );
}

const Wraper = styled.div`
  background-color: #171717;
  width: 611px;
  height: 276px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const ProfilePicture = styled.div`
  margin-top: 16px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  react-icons {
    font-size: 10px;
  }
`;

const Content = styled.div`
  margin-top: 15px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 19px;
    color: #ffffff;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-weight: 700px;
    font-size: 17px;
    color: #b7b7b7;
  }
  .name_icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
    .Pencil{
      margin-right: 10px;
    }
    .Trash{
      margin-right: 15px;
    }
  }

`;

const Link = styled.div`
  display: flex;
  width: 503px;
  height: 155px;

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 19px;
    color: #ffffff;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;
