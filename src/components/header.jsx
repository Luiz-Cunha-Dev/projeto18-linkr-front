import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profilePicture from "../images/userPicture.png"

export default function Header() {
  const navigate = useNavigate();
  const [logoutButton, setLogoutButton] = useState(false);
  const [search, setSearch] = useState("");
  const [userPicture, setUserPicture] = useState(profilePicture)
  const [users, setUsers] = useState([])
  const token = localStorage.getItem("localToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const URL = "https://api-linkr-0kjk.onrender.com/users/me";

    axios
      .get(URL, config)
      .then((res) => {
        console.log(res)
        setUserPicture(res.data.pictureUrl)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  function searchUsers() {
    if (search !== "") {
      const URL = "https://api-linkr-0kjk.onrender.com/users";

      axios
        .post(URL, {username:search})
        .then((res) => {
          console.log(search);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (search !== "") {
      const URL = "https://api-linkr-0kjk.onrender.com/users";

      axios
        .post(URL, {username:search})
        .then((res) => {
          setUsers(res.data)
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      setUsers([])
    }
  }, [search]);

  function logout() {
    if (!window.confirm("You are logging out of your account")) {
      return;
    }

    const URL = "https://api-linkr-0kjk.onrender.com/logout";

    axios
      .delete(URL, config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("localToken");
        localStorage.removeItem("linkr");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }

  return (
    <>
      <HeaderStyle state={logoutButton !== true ? "none" : "initial"} heigth={users.length === 0 ? "none" : "initial"}>
        <div className="logo">linkr</div>
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
          {users.map(u => 
            <div className="user">
            <img src={u.pictureUrl} alt="profilePicture" />
            <span>{u.username}</span>
          </div>)}
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

          <img
            src={userPicture}
            alt="picture"
          />
        </div>
        <div onClick={logout} className="logout">
          Logout
        </div>
      </HeaderStyle>
      <SearchBar>
        <DebounceInput
          className="debounceInput"
          placeholder="Search for people"
          minLength={3}
          debounceTimeout={300}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FiSearch onClick={searchUsers} className="searchIcon" />
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
    display: ${props => props.heigth};
background: #E7E7E7;
border-radius: 8px;
padding-top: 30px;
padding-bottom: 7px;
padding-left: 17px;
@media (max-width: 1228px) {
      width: 300px;
      left: 180px;
    }
@media (max-width: 614px) {
    left: 0px;
    top: 115px;
    width: 90%;
    margin-left: 5%;
    }
    .user{
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      img{
        width: 39px;
        border-radius: 304px;
        margin-right: 12px;
      }
      span{
        font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #515151;
      }

    }
  }
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: relative;
  margin-bottom: 19px;
  .debounceInput{
  width: 90%;
height: 45px;
background: #FFFFFF;
border-radius: 8px;
padding-left: 14px;
::placeholder{
  font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #C6C6C6;
}
@media (min-width: 614px){
    display: none;
}
}
.searchIcon{
  position: absolute;
  left: 85%;
  width: 21px;
  color: #C6C6C6;
  z-index: 1;
  cursor: pointer;
  @media (min-width: 614px){
    display: none;
}
}
`;
