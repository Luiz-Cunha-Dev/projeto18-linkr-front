import { useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../images/profilepic.png";
//import urlMetaData from "url-metadata";
import { getPosts } from "../services/linkrAPI.jsx";

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
  return (
    <Wraper>
      <ProfilePicture>
        <img src={ProfilePic} alt="" />
      </ProfilePicture>
      <Content>
        <h1>Name</h1>
        <h2>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
          #react #material
        </h2>
        <Link>
          <h1></h1>
          <h2></h2>
          <h3></h3>
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
  flex-direction: column;
  width: 503px;
  height: 155px;

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 19px;
    color: #ffffff;
  }
`;
