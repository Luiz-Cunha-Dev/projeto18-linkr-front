import React, { useState } from "react";
import styled from "styled-components";
import {FiChevronDown, FiChevronUp} from "react-icons/fi"

export default function Header() {
    const [logoutButton, setLogoutButton] = useState(false)


    return (
  <HeaderStyle state={logoutButton !== true ? "none" : "initial"}>
<div className="logo">linkr</div>
<div className="rigth">
    {logoutButton !== true ?  <FiChevronDown onClick={() => setLogoutButton(!logoutButton)} className="react-icons" /> :  <FiChevronUp onClick={() => setLogoutButton(!logoutButton)} className="react-icons" />}

    <img src="https://akamai.sscdn.co/letras/215x215/fotos/e/a/7/6/ea76e83f5ba5d48f5d685d6270f0c71e.jpg" alt="picture" />
    </div>
    <div  className="logout">Logout</div>
  </HeaderStyle>
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
  .logo{
    font-family: 'Passion One';
font-style: normal;
font-weight: 700;
font-size: 49px;
line-height: 54px;
letter-spacing: 0.05em;
color: #FFFFFF;
  }
  .rigth{
    display: flex;
    align-items: center;
    img{
        width: 53px;
        border-radius: 25px;
        margin-left: 10px;
    }
  }
  .react-icons {
    font-size: 53px;
  color: white;
  height: 100px;
  cursor: pointer;
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
}
  `