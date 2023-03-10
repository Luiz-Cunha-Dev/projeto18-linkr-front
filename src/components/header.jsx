import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../contexts/userContexts";



export default function Header() {
  const navigate = useNavigate();
  const [logoutButton, setLogoutButton] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([])
  const { userPicture, setUserPicture} = useContext(userContext);



  useEffect(() => {
    const URL = "https://api-linkr-0kjk.onrender.com/users/me";

    const token = localStorage.getItem("localToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        setUserPicture(res.data.pictureUrl);
        localStorage.setItem("userId", res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function searchUsers() {
        const token = localStorage.getItem("localToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (search !== "") {
      const URL = "https://api-linkr-0kjk.onrender.com/users";

      axios
        .post(URL, { username: search }, config)
        .then((res) => {
          const following = res.data.filter(u => u.following === true);
          const noFollowing = res.data.filter(u => u.following === false);
          let sortedUsers = [];
          following.map(u => sortedUsers.push(u))
          noFollowing.map(u => sortedUsers.push(u))
          setUsers(sortedUsers)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
        const token = localStorage.getItem("localToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (search !== "") {
      const URL = "https://api-linkr-0kjk.onrender.com/users";

      axios
        .post(URL, { username: search }, config)
        .then((res) => {
          const following = res.data.filter(u => u.following === true);
          const noFollowing = res.data.filter(u => u.following === false);
          let sortedUsers = [];
          following.map(u => sortedUsers.push(u))
          noFollowing.map(u => sortedUsers.push(u))
          setUsers(sortedUsers)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUsers([]);
    }
  }, [search]);

  function logout() {
    if (!window.confirm("You are logging out of your account")) {
      return;
    }

    const token = localStorage.getItem("localToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const URL = "https://api-linkr-0kjk.onrender.com/logout";

    axios
      .delete(URL, config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("localToken");
        localStorage.removeItem("update");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
        localStorage.removeItem("localToken");
        localStorage.removeItem("update");
        navigate("/");
      });
  }

  return (
    <>
      <HeaderStyle
        state={logoutButton !== true ? "none" : "initial"}
        heigth={users.length === 0 ? "none" : "initial"}
      >
        <Link to="/timeline">
          <div className="logo">linkr</div>
        </Link>
        <DebounceInput
          className="debounceInput"
          placeholder="Search for people"
          minLength={3}
          debounceTimeout={300}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FiSearch onClick={searchUsers} className="search" />
        <div className="users">
          {users.map((u, i) => (
            <Link
              key={i}
              to={`/user/${u.id}`}
              onClick={() => Location.reload()}
            >
              <div className="user">
                <img src={u.pictureUrl} alt="profile" />
                <p>
                  {u.username}
                  {u.following === true ? <span>??? following</span> : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="rigth">
          {logoutButton !== true ? (
            <FiChevronDown
              onClick={() => setLogoutButton(!logoutButton)}
              className="react-icons"
            />
          ) : (
            <FiChevronUp
              onClick={() => setLogoutButton(!logoutButton)}
              className="react-icons"
            />
          )}

          <img src={userPicture} alt="user" />
        </div>
        <div onClick={logout} className="logout">
          Logout
        </div>
      </HeaderStyle>
      <SearchBar heigth={users.length === 0 ? "none" : "initial"}>
        <DebounceInput
          className="debounceInput"
          placeholder="Search for people"
          minLength={3}
          debounceTimeout={300}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FiSearch onClick={searchUsers} className="searchIcon" />
        <div className="users">
          {users.map((u, i) => (
            <Link
              key={i}
              to={`/user/${u.id}`}
              onClick={() => Location.reload()}
            >
              <div className="user">
                <img src={u.pictureUrl} alt="profile" />
                <p>
                  {u.username}
                  {u.following === true ? <span>??? following</span> : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SearchBar>
    </>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 28px;
  padding-right: 17px;
  background: #151515;
  position: relative;
  position: fixed;
  top: 0;
  z-index: 3;
  @media (max-width: 614px) {
    padding-left: 17px;
    padding-right: 15px;
  }
  .logo {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #ffffff;
    @media (max-width: 614px) {
      font-size: 45px;
      line-height: 50px;
    }
  }
  .rigth {
    display: flex;
    align-items: center;
    img {
      width: 53px;
      border-radius: 25px;
      margin-left: 10px;
      @media (max-width: 614px) {
        width: 41px;
        border-radius: 25px;
      }
    }
  }
  .react-icons {
    font-size: 53px;
    color: white;
    height: 100px;
    cursor: pointer;
    @media (max-width: 614px) {
      font-size: 25px;
    }
  }
  .logout {
    z-index: 2;
    padding-left: 37px;
    padding-top: 9px;
    width: 135px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    position: absolute;
    right: 0px;
    top: 72px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
    display: ${(props) => props.state};
    cursor: pointer;
    @media (max-width: 614px) {
      font-size: 15px;
      line-height: 18px;
      height: 43px;
    }
  }
  .debounceInput {
    position: absolute;
    width: 563px;
    height: 45px;
    left: 460px;
    top: 14px;
    background: #ffffff;
    border-radius: 8px;
    padding-left: 14px;
    z-index: 1;
    border: thin;
    ::placeholder {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #c6c6c6;
    }
    @media (max-width: 1228px) {
      width: 300px;
      left: 180px;
    }
    @media (max-width: 614px) {
      display: none;
    }
  }
  .search {
    position: absolute;
    left: 990px;
    width: 21px;
    color: #c6c6c6;
    z-index: 1;
    cursor: pointer;
    @media (max-width: 1228px) {
      left: 445px;
    }
    @media (max-width: 614px) {
      display: none;
    }
  }
  .users{
    position: absolute;
    left: 460px;
    top: 45px;
    width: 563px;
    display: ${(props) => props.heigth};
background: #E7E7E7;
border-radius: 8px;
padding-top: 30px;
padding-bottom: 7px;
padding-left: 17px;
z-index: 0;
@media (max-width: 1228px) {
      width: 300px;
      left: 180px;
    }
@media (max-width: 614px) {
display: none;
    }
    .user{
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      img{
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-right: 12px;
      }
      p{
        font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #515151;
span{
  font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #C5C5C5;
margin-left: 7px;
}

    }
  }
}
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  position: relative;
  margin-bottom: 19px;
  .debounceInput {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border-radius: 8px;
    border: thin;
    padding-left: 14px;
    margin-left: 5%;
    margin-right: 5%;
    z-index: 2;
    ::placeholder {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #c6c6c6;
    }
    @media (min-width: 614px) {
      display: none;
    }
  }
  .searchIcon {
    position: absolute;
    left: 85%;
    width: 21px;
    color: #c6c6c6;
    z-index: 2;
    cursor: pointer;
    @media (min-width: 614px) {
      display: none;
    }
  }
  .users {
    position: absolute;
    left: 460px;
    top: 45px;
    width: 563px;
    display: ${(props) => props.heigth};
    background: #e7e7e7;
    border-radius: 8px;
    padding-top: 30px;
    padding-bottom: 7px;
    padding-left: 17px;
    z-index: 0;
    @media (max-width: 614px) {
      left: 5%;
      top: 30px;
      width: 90%;
    }
    @media (min-width: 614px) {
      display: none;
    }
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      img {
        width: 39px;
        height: 39px;
        border-radius: 304px;
        margin-right: 12px;
      }
      p {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        span {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 19px;
          line-height: 23px;
          color: #c5c5c5;
        }
      }
    }
  }
`;
