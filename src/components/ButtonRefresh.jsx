import styled from "styled-components"
import { getPosts, getPostsById } from "../services/linkrAPI.jsx";
import { useEffect, useState, useContext } from "react";
import userContext from "../contexts/userContexts.jsx";

export default function ButtonRefresh(){
  const [postsIniciais, setPostsIniciais] = useState([])
  const [novosPosts, setNovosPosts] = useState([])

  const { boxReloadPost, setBoxReloadPost, setPost, setContador, contador } = useContext(userContext);

    useEffect(() => {
      console.log("entrou useEffect")
          getPosts()
            .then((res) => {
              console.log("Entrou no then")
              reload(res.data)
              setPostsIniciais(res.data)
              setNovosPosts(res.data)
            })
            .catch((err) => {
              alert(
                "An error occured while trying to fetch the posts, please refresh the page"
              );
              console.log(err);
            });
      }, []);

      function reload(){
        console.log("Reload")
        setInterval(()=>{
          getPosts()
              .then((res) => {
                setNovosPosts(res.data)
                compairPosts()
              })
              .catch((err) => {
                console.log("An error occured while trying to fetch the posts, please refresh the page")
                console.log(err)
              });
        }, 1000)
      }
      
      function compairPosts(){
        if(postsIniciais.length !== novosPosts.length){
          setBoxReloadPost(true)
          console.log("Compair posting")
        }
      }

      function RenderNewPosts(){
        setPostsIniciais(novosPosts)
        setPost(novosPosts)
        setBoxReloadPost(false)
        setContador(0)
      }

    return(
        <>
            <Container onClick={()=> RenderNewPosts()}>
              <p>{contador} new posts, load more!</p>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-bottom: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:10px;
    font-family: "Lato";
    font-size: 16px;
    background-color: #1877F2;
    width: 611px;
    height: 61px;
    cursor: pointer;
    @media (max-width: 614px) {
      width: 90%;
      height: 55px;
      margin-left: 5%;
      margin-right: 5%;
  }

`