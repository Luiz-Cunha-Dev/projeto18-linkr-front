import React, { useState } from "react";
import styled from "styled-components";
import {FiChevronDown, FiChevronUp, FiSearch} from "react-icons/fi"
import {DebounceInput} from 'react-debounce-input';
import axios from "axios";

export default function Header() {
    const [logoutButton, setLogoutButton] = useState(false)
    const [search, setSearch] = useState("")

    function searchUsers(){
      if(search !== ""){
        const URL = "https://api-linkr-0kjk.onrender.com/users"

        axios.get(URL, {name: search})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    }

    return (
      <>
  <HeaderStyle state={logoutButton !== true ? "none" : "initial"}>
<div className="logo">linkr</div>
<DebounceInput className="debounceInput" placeholder="Search for people" minLength={3} debounceTimeout={300} onChange={event => setSearch(event.target.value)} />
<FiSearch onClick={searchUsers} className="search"/>
<div className="rigth">
    {logoutButton !== true ?  <FiChevronDown onClick={() => setLogoutButton(!logoutButton)} className="react-icons" /> :  <FiChevronUp onClick={() => setLogoutButton(!logoutButton)} className="react-icons" />}

    <img src="https://akamai.sscdn.co/letras/215x215/fotos/e/a/7/6/ea76e83f5ba5d48f5d685d6270f0c71e.jpg" alt="picture" />
    </div>
    <div  className="logout">Logout</div>
  </HeaderStyle>
  <SearchBar>
  <DebounceInput className="debounceInput" placeholder="Search for people" minLength={3} debounceTimeout={300} onChange={event => setSearch(event.target.value)} />
  <FiSearch onClick={searchUsers} className="searchIcon"/>
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
  @media (max-width: 614px){
  padding-left: 17px;
  padding-right: 15px;
}
  .logo{
    font-family: 'Passion One';
font-style: normal;
font-weight: 700;
font-size: 49px;
line-height: 54px;
letter-spacing: 0.05em;
color: #FFFFFF;
@media (max-width: 614px){
  font-size: 45px;
line-height: 50px;
}
  }
  .rigth{
    display: flex;
    align-items: center;
    img{
        width: 53px;
        border-radius: 25px;
        margin-left: 10px;
        @media (max-width: 614px){
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
  @media (max-width: 614px){
  font-size: 25px;
}
}
.logout{
padding-left: 37px;
padding-top: 9px;
    width: 135px;
    height: 47px;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    position: absolute;
    right: 0px;
    top: 72px;
    font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;
letter-spacing: 0.05em;
color: #FFFFFF;
display: ${props => props.state};
@media (max-width: 614px){
  font-size: 15px;
line-height: 18px;
height: 43px;
}
}
.debounceInput{
  position: absolute;
width: 563px;
height: 45px;
left: 460px;
top: 14px;
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
@media (max-width: 1228px){
  width: 300px;
  left: 180px;
}
@media (max-width: 614px){
  display: none;
}
}
.search{
  position: absolute;
  left: 990px;
  width: 21px;
  color: #C6C6C6;
  z-index: 1;
  @media (max-width: 1228px){
  left: 445px;
}
  @media (max-width: 614px){
    display: none;
}
}
  `
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
  @media (min-width: 614px){
    display: none;
}
  `