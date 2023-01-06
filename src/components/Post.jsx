import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../images/profilepic.png";
//import urlMetaData from "url-metadata";
import { getPosts } from "../services/linkrAPI.jsx";
import { IoHeartOutline, IoHeart, IoPencil, IoTrash } from "react-icons/io5";

export default function Post() {
  /* return res.json({
              data: [
                {
                  title: metadata.title,
                  url: metadata.url,
                  image: metadata.image,
                  description: metadata.description,
                },
              ],
            }); */
            /*
  const linkInfo = { title: "", url: "", image: "", description: "" };

  useEffect(() => {
    getPosts()
      .then((res) => {
        urlMetaData("https://www.youtube.com/").then(
          function (metadata) {
            console.log(metadata);
            linkInfo.title = metadata.title;
            linkInfo.url = metadata.url;
            linkInfo.image = metadata.image;
            linkInfo.description = metadata.description;
          },
          function (error) {
            console.log(error);
          }
        );
      })

      .catch((err) => {
        alert(`Erro: ${err.message}`);
      });
  }, []);

  */

  const [curtida, setCurtida] = useState("IoHeartOutline");

  function curtir() {
    console.log("oi")
    if(curtida === "IoHeartOutline") { 
      setCurtida("IoHeart")
      console.log("foi")
    }
    else{
      setCurtida("IoHeartOutline")
      console.log("fui")
    }
  }
  const title = "titulo";
  const url = "abc.com";
  const image = "data:image/png;base64,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";
  const description = "existo";
  return (
    <Wraper>
      <ProfilePicture>
        <img src={ProfilePic} alt="" />
        <div onClick={curtir}>
        {(curtida === IoHeart) ? <IoHeart /> : <IoHeartOutline />}
        </div>
      </ProfilePicture>
      <Content>
        <div>
        <h1>Name</h1>
        <IoPencil />
        <IoTrash />
        </div>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
          #react #material
        </h2>
        <Link>
        <div>
          <h1>{title}</h1>
          <h2>{description}</h2>
          <h3>{url}</h3>
        </div>
          <img src={image} alt="" />
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
`;

const ProfilePicture = styled.div`
  margin-top: 16px;
  margin-left: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  margin-top: 21px;
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
