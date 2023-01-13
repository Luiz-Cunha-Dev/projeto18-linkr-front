import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { getPosts, getPostsById, getPostsFromPeopleYouFollow } from "../services/linkrAPI.jsx";
import {
  IoHeartOutline,
  IoHeart,
  IoPencil,
  IoTrash,
  IoRepeatSharp,
} from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import { ReactTagify } from "react-tagify";
import { useContext } from "react";
import userContext from "../contexts/userContexts.jsx";
import ModalDelete from "./ModalDelete.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { FiFrown } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Post() {
  const [curtida, setCurtida] = useState("IoHeartOutline");
  const { setIsOpen, setPostIdtoDelete, posts, setPost  } = useContext(userContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");


  useEffect(() => {

    if (id !== undefined) {
      getPostsById(id)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          alert(
            "An error occured while trying to fetch the posts, please refresh the page"
          );
          console.log(err);
        });
    } else {
        getPostsFromPeopleYouFollow()
        .then((res) => {
          setPost(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log("An error occured while trying to fetch the posts, please refresh the page")
          console.log(err);
        });
    }
  }, []);

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

  function openModal(postid) {
    setPostIdtoDelete(postid);
    setIsOpen(true);
  }

  function ToGoHashtagPage(hash) {
    const hashtag = hash.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
  }

  // if (posts.length === 0) {
  //   return (
  //     <NoPosts>
  //       <h1>There are no posts yet</h1>
  //       <FiFrown />
  //     </NoPosts>
  //   );
    if (posts.length === 0&& id === undefined) {
      return (
        <NoPosts>
          <h1>You don't follow anyone yet. Search for new friends!</h1>
          <FiFrown />
        </NoPosts>
      );
  }else if(posts.length === 0 && id !== undefined && id === userId){
       return (
          <NoPosts>
            <h1>There are no posts yet</h1>
            <FiFrown />
          </NoPosts>
        );
  }else if(posts.length === 0 && id !== undefined){
    return (
       <NoPosts>
         <h1>No posts found from your friends</h1>
         <FiFrown />
       </NoPosts>
     );
} else {
    return (
      <>
        {posts.map((obj, key) => (
          <Wraper key={key}>
            <ProfilePicture>
            <Link
              to={`/user/${obj.userId}`}
              onClick={() => Location.reload()}
            >
              <img src={obj.userImage} alt="" ></img>
              </Link>
              <div onClick={curtir} className="Heart">
                {curtida === "IoHeart" ? (
                  <IoHeart size={26} color={"#AC0000"} />
                ) : (
                  <IoHeartOutline size={26} />
                )}
              </div>
              <FaRegCommentDots size={22} className="Comment" />
              <IoRepeatSharp size={25} className="Repost" />
            </ProfilePicture>
            <Content>
              <div className="name_icons">
              <Link
              to={`/user/${obj.userId}`}
              onClick={() => Location.reload()}
            >
                <h1>{obj.userName}</h1>
                </Link>
                <div>
                  <IoPencil size={25} className="Pencil" />
                  <IoTrash
                    size={25}
                    className="Trash"
                    onClick={() => openModal(obj.postId)}
                  />
                </div>
                <ModalDelete isOpen={true} ariaHideApp={false} />
              </div>
              <ReactTagify
                colors={"white"}
                tagClicked={(tag) => ToGoHashtagPage(tag)}
              >
                <h2>{obj.postComment}</h2>
              </ReactTagify>
              <a href={obj.linkInfo.linkUrl}>
                <LinkFrame>
                  <div>
                    <h1>{obj.linkInfo.linkTitle}</h1>
                    <h2>{obj.linkInfo.linkDescription}</h2>
                    <h3>{obj.linkInfo.linkUrl}</h3>
                  </div>
                  <img src={obj.linkInfo.linkImage} alt="" />
                </LinkFrame>
              </a>
            </Content>
          </Wraper>
        ))}
      </>
    );
  }
}

const Wraper = styled.div`
  background-color: #171717;
  width: 611px;
  min-height: 276px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  @media (max-width: 614px) {
    width: 100vw;
    border-radius: 0px;
  }
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
    @media (max-width: 614px) {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
  }
  .Comment {
    margin-top: 30px;
  }
  .Repost {
    margin-top: 30px;
  }
  .Heart {
    margin-top: 16px;
  }
`;

const Content = styled.div`
  margin-top: 15px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  @media (max-width: 614px) {
    margin-left: 14px;
  }

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 19px;
    color: #ffffff;
    @media (max-width: 614px) {
      font-size: 17px;
      line-height: 20px;
    }
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-weight: 700px;
    font-size: 17px;
    color: #b7b7b7;
    @media (max-width: 614px) {
      font-size: 15px;
      font-weight: 400;
      line-height: 18px;
    }
  }
  .name_icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
    .Pencil {
      margin-right: 10px;
      @media (max-width: 614px) {
        font-size: 6px;
        margin-top: 10px;
      }
    }
    .Trash {
      margin-right: 15px;
      @media (max-width: 614px) {
        font-size: 6px;
        margin-top: 10px;
      }
    }
  }
`;

const LinkFrame = styled.div`
  display: flex;
  width: 503px;
  height: 100%;
  margin-top: 15px;
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  @media (max-width: 614px) {
    width: 288px;
    height: 100%;
  }
  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    font-size: 16px;
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 11px;
      line-height: 13px;
    }
  }

  h2 {
    font-size: 11px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
  h3 {
    font-size: 11px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    color: #cecece;
    word-break: break-all;
    @media (max-width: 614px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 153.44px;
    min-height: 155px;
    border-radius: 0px 10px 10px 0px;
    @media (max-width: 614px) {
      width: 95px;
      min-height: 115px;
      border-radius: 0px 12px 13px 0px;
    }
  }
`;

const NoPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  width: 630px;
  padding-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 614px) {
    width: 100vw;
    padding-top: 70px;
  }

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 20px;
  }
`;
