import styled from "styled-components"
import { getPosts, getPostsById } from "../services/linkrAPI.jsx";
import { useEffect, useState } from "react";

export default function ButtonRefresh(){
  const [postsIniciais, setPostsIniciais] = useState([])
  const [novosPosts, setNovosPosts] = useState([])
  const mapPostsIniciais = postsIniciais.map((post)=> post.postId)
  const mapNovosPosts = novosPosts.map((post)=> post.postId)
  const arrayPushPosts = []

    useEffect(() => {
          getPosts()
            .then((res) => {
              setPostsIniciais(res.data)
            })
            .catch((err) => {
              alert(
                "An error occured while trying to fetch the posts, please refresh the page"
              );
              console.log(err);
            });
      }, []);

    return(
        <>
            <Container>
                <p>{arrayPushPosts.length + 1} new posts, load more!</p>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:5px;
    font-family: "Lato";
    font-size: 16px;
    background-color: #1877F2;
    width: 611px;
    height: 61px;
    @media (max-width: 614px) {
      width: 90%;
      height: 55px;
      margin-left: 5%;
      margin-right: 5%;
  }
`