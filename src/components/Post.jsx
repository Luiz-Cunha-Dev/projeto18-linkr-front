import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../images/profilepic.png";
import { deletePost, getPosts } from "../services/linkrAPI.jsx";
import { IoHeartOutline, IoHeart, IoPencil, IoTrash } from "react-icons/io5";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [curtida, setCurtida] = useState("IoHeartOutline");
  const [posts, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts()
      .then((resp) => {
        setPost(resp.data);
      })
      .catch((err) => console.log(err));
  }, [posts]);

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

  function deleteOnePost() {
    alert("delete clicado");
    const postId = posts.postid;

    deletePost(postId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {posts.map((obj) => (
        <Wraper>
          <ProfilePicture>
            <img src={obj.userImage} alt="" />
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
              <h1>{obj.userName}</h1>
              <div>
                <IoPencil size={25} className="Pencil" />
                <IoTrash
                  size={25}
                  className="Trash"
                  onClick={() => deleteOnePost(obj.postId)}
                />
              </div>
            </div>
            <ReactTagify colors={"white"} tagClicked={(tag) => alert(tag)}>
              <h2>{obj.postComment}</h2>
            </ReactTagify>
            <a href={obj.linkInfo.linkUrl}>
              <Link>
                <div>
                  <h1>{obj.linkInfo.linkTitle}</h1>
                  <h2>{obj.linkInfo.linkDescription}</h2>
                  <h3>{obj.linkInfo.linkUrl}</h3>
                </div>
                <img src={obj.linkInfo.linkImage} alt="" />
              </Link>
            </a>
          </Content>
        </Wraper>
      ))}
    </>
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
    .Pencil {
      margin-right: 10px;
    }
    .Trash {
      margin-right: 15px;
    }
  }
`;

const Link = styled.div`
  display: flex;
  width: 503px;
  height: 155px;
  margin-top: 15px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 16px;
    color: #ffffff;
    padding-left: 10px;
    padding-top: 10px;
  }

  h2 {
    font-size: 11px;
    padding-left: 10px;
    padding-top: 10px;
  }
  h3 {
    font-size: 11px;
    padding-left: 10px;
    padding-top: 10px;
    color: #cecece;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 153.44px;
    height: 155px;
    border-radius: 0px 10px 10px 0px;
  }
`;
