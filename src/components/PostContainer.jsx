import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState, useCallback } from "react";
import { getPosts, getPageUser, getUsersList } from "../services/linkrAPI";
import Loading from "../commons/Loading";
import {BiRefresh} from 'react-icons/bi'
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "use-interval";

const TIMELINE_UPDATE_REFRESH_TIME = 15000;
const NUMBER_OF_POSTS_TO_LOAD = 10;

const getNumberOfPostsToLoad = (posts, newPosts) => {
    const newPostIds = newPosts.map((post) => post.id);
    const numberOfPostsToLoad = posts.filter((post) => !newPostIds.includes(post.id)).length;

    return numberOfPostsToLoad;
}


function LoadNewPostsButton({ numberNewPosts, status, setStatus, reRender, setReRender }) {
    const handleRefresh = () => {
      setReRender(!reRender);
      setStatus('Loaded new posts');
    };
  
    return (
      <>
        {numberNewPosts > 0 && status !== 'deleted' ? (
          <NewPostsButtonStyle onClick={() => handleRefresh()}>
            <h2>{`${numberNewPosts} new ${numberNewPosts > 1 ? 'posts' : 'post'}, load more!`}</h2>
            <BiRefresh className='icon' />
          </NewPostsButtonStyle>
        ) : (
          <></>
        )}
      </>
    );
  }


export default function PostContainer({status, setStatus, id = 0}) {

    const [posts, setPosts] = useState([]);
    const [newLoadedPosts, setNewLoadedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [fetchingNewPosts, setFetchingNewPosts] = useState(false);
    const [postPage, setPostPage] = useState(1);
    const [followedNoPosts, setFollowedNoPosts] = useState(false);
    
    useInterval(() => {
        if(id === 0) {
            const promise = getPosts({});
           
            promise
                .then((res) => {
                    setNewLoadedPosts(res.data.posts);
                })
                .catch((res) => {
                    console.log(res);
                    setNewLoadedPosts([]);
                    setFailedToLoad(true);
                });
        }
    }, TIMELINE_UPDATE_REFRESH_TIME);

    useEffect(() => {
        setIsLoading(true);

        const promise = id === 0 ? getPosts({limit: NUMBER_OF_POSTS_TO_LOAD, offset: 0}) : getPageUser({id, limit: NUMBER_OF_POSTS_TO_LOAD, offset: 0});

        promise
            .then((res) => {
                setPosts(res.data.posts);
                isLoading(false);
            })
            .catch((res) => {
                console.log(res);
                setPosts([]);
                setFailedToLoad(true);
            }
        );
    }, [id, reRender]);

    const fetchItens = useCallback( async () => {
        
        if(fetchingNewPosts) return;

        setFetchingNewPosts(true);

        try {
            let fetchedPosts = null;

            if(id === 0) {
                fetchedPosts = await getPosts({
                    limit: NUMBER_OF_POSTS_TO_LOAD, 
                    offset: postPage * NUMBER_OF_POSTS_TO_LOAD});
            }
            else {
                fetchedPosts = await getPageUser({
                    id, 
                    limit: NUMBER_OF_POSTS_TO_LOAD, 
                    offset: postPage * NUMBER_OF_POSTS_TO_LOAD});
            }

            setPosts([...posts, ...fetchedPosts.data.posts]);

            if(fetchedPosts.data.posts.length < NUMBER_OF_POSTS_TO_LOAD) {
                setHasMore(false);
            }
            else {
                setPostPage(postPage + 1);
            }
        
        } finally {
            setFetchingNewPosts(false);
            
        }
    }, [posts, postPage, fetchingNewPosts]);

    useEffect(() => {
        const promise = getUsersList('allusers');

        promise
            .then((res) => {
                if(res.data.filter((user) => parseInt(user.follow) > 0).length > 0) {
                    setFollowedNoPosts(true);
                }
            })
            .catch((res) => {
                console.log(res);
            }
        );
    }, []);

    if(failedToLoad) {
        return (
            <Container>
                <h1>Failed to load posts</h1>
            </Container>
        );
    }

    const loader = (
        <>
            <Wrapper key={0}>
                <WarningMessage color={'white'}>Loading</WarningMessage>
                <Loading color={'white'} />
            </Wrapper>
        </>

    );

    if (isLoading) {
        return loader;
    }

    if (posts.length === 0) {

        function NotFoundPostUser () {
            return (
                <>
                  {id !== 0 ? (
                    'User has no posts yet!'
                  ) : (
                    <>
                      {followedNoPosts
                        ? 'No posts found from your friends'
                        : `You don't follow anyone yet. Search for new friends!`}
                    </>
                  )}
                </>
              );
        }
    
        return (
            <>
                <Wrapper>
                    <WarningMessage color={'white'}>
                        <NotFoundPostUser />
                    </WarningMessage>
                </Wrapper>
            </>
        );
    }

    const numberNewPosts = getNumberOfPostsToLoad(posts, newLoadedPosts);   
    
    return (
        <>
            <Wrapper>
                <LoadNewPostsButton 
                    numberNewPosts={numberNewPosts}
                    status={status}
                    setStatus={setStatus}
                    reRender={reRender}
                    setReRender={setReRender}
                />
                <InfiniteScroll
                loadMore={fetchItens}
                hasMore={hasMore}
                loader={loader}
                className='scroll'>
                    {posts.map((post) => (
                        <Post
                            user={post.user}
                            id={post.userId}
                            text={post.text}
                            link={post.linksId}
                            likes={post.likes}
                            reposts={post.reposts}
                            comments={post.comments}
                            reRender={reRender}
                            setReRender={setReRender}
                            status={status}
                            setStatus={setStatus}
                        />
                    ))}
                </InfiniteScroll>             
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
margin-top: 29px;
margin: 29px auto 0 auto;
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap: 25px;
.infinite-scroll {
  width: 100%;
}
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 100px;
  padding: 18px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  color: ${(props) => props.color || 'ffffff'};
`;

const Container = styled.div`
    width: 611px;
    height: 100%;
    margin: 0 auto;

    @media (max-width: 611px) {
        width: 100%;
    }
`;

const NewPostsButtonStyle = styled.div`
width: 100%;
height: 61px;
background-color: #1877f2;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
h2 {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin-right: 10px;
}
.icon {
  font-size: 22px;
  color: #ffffff;
}
`;