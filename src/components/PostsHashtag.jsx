import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { getPosts } from "../services/linkrAPI.jsx";
import { IoHeartOutline, IoHeart, IoPencil, IoTrash } from "react-icons/io5";
import { ReactTagify } from "react-tagify";
import { useContext } from "react";
import userContext from "../contexts/userContexts.jsx";
import ModalDelete from "./ModalDelete.jsx";
import { useNavigate } from "react-router-dom";

export default function Post(props) {
    const [curtida, setCurtida] = useState("IoHeartOutline");
    const [posts, setPost] = useState([]);
    const { setIsOpen, setPostIdtoDelete } = useContext(userContext);
    const navigate = useNavigate();
    const { hash } = props

    useEffect(() => {
        getPosts()
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                alert(
                    "An error occured while trying to fetch the posts, please refresh the page"
                );
                console.log(err);
            });
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

    function openModal(postid) {
        setPostIdtoDelete(postid);
        setIsOpen(true);
    }

    function ToGoHashtagPage() {
        const hashtag = hash.replace("#", "");
        navigate(`/hashtag/${hashtag}`);
        const afsdf = hashtag.includes(hash)
        console.log(afsdf)
    }

    if (posts.length === 0) {
        return (
            <>
                <h1>There are no posts yet</h1>
            </>
        );
    } else {
        return (
            <>
                {posts.map((obj, key) => 
                    <>
                        {obj.postComment.includes(`#${hash}`)? <Wraper key={key}>
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
                </Wraper> : ""}
                    </>
                )}
            </>
        );
    }
}

const Wraper = styled.div`
  background-color: #171717;
  width: 611px;
  height: 276px;
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

  react-icons {
    font-size: 10px;
    color: white;
    @media (max-width: 614px) {
      font-size: 6px;
      react-icons:hover{
        cursor: pointer;
      }
    }
  }
`;

const Content = styled.div`
  margin-top: 15px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
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

const Link = styled.div`
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
