import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../services/linkrAPI";
import userContext from "../contexts/userContexts.jsx";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styled from "styled-components";

export default function LogoutTab() {
    
  const navigate = useNavigate();
  
  const [turnOff, setTurnOff] = useState(false);
  
  const { user, setUser } = useContext(userContext);
  
  function resetUser() {
    logout()
      .then(() => {
        localStorage.removeItem("linkr");
          setUser({});
        navigate("/");
        })
      .catch(() => {
        alert("Não foi possível fazer logout. Tente novamente.");
      });
    }
  
    return (
      <>
        <ContainerTop
          onClick={() => {
            if (turnOff) {
              setTurnOff(false);
            }
          }}
        >
          <Linkr>
            <h1 onClick={() => navigate("/")}>linkr</h1>
          </Linkr>
          <ContainerPictureUser onClick={() => setTurnOff(!turnOff)}>
            {turnOff ? <FiChevronUp /> : <FiChevronDown />}
  
            <PictureUser
              src={user && user.profilePic ? user.profilePic : "https://picsum.photos/200/300"}
            />
          </ContainerPictureUser>
        </ContainerTop>
        <BoxLogout active={turnOff}>
          <div>
            <h3 onClick={() => resetUser()}>logout</h3>
          </div>
        </BoxLogout>
        <ClickCaptureBox
          active={turnOff}
          onClick={() => {
            if (turnOff) {
              setTurnOff(false);
            }
          }}
        />
      </>
    );
  }
  
  const ContainerTop = styled.div`
    position: fixed;
    width: 100%;
    height: 72px;
    left: 0px;
    top: 0px;
    z-index: 6;
    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  `;
  
  const ContainerPictureUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 78px;
    color: #ffffff;
    font-size: 28px;
    cursor: pointer;
  `;
  
  const BoxLogout = styled.div`
    position: fixed;
    width: 150px;
    height: 47px;
    top: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #171717;
    border-radius: 0px 0px 20px 20px;
    transition: all 0.8s;
    h3 {
      font-family: "Lato";
      font-weight: 700;
      font-size: 17px;
      letter-spacing: 0.05em;
      color: #ffffff;
      cursor: pointer;
    }
    ${(props) => {
      if (props.active) {
        return `
          transform: translateY(72px);
          z-index: 6;
        `;
      }
    }}
  `;
  
  const PictureUser = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 26px;
    object-fit: cover;
  `;
  
  const Linkr = styled.div`
    h1 {
      font-size: 45px;
      font-weight: 700;
      color: #ffffff;
      transition: all 0.6s;
      font-family: "Passion One";
      letter-spacing: 0.05em;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
  `;
  
  const ClickCaptureBox = styled.div`
    display: none;
    position: fixed;
    top: 72px;
    left: 0;
    width: 100%;
    height: 100%;
    ${(props) => {
      if (props.active) {
        return `
          display flex;
        `;
      }
    }}
  `;