import styled from "styled-components";
import React from "react";
import { Container } from "../global/fonts";
import { Link } from "react-router-dom";

export default function SignUp() {
    
  return(
    <Wrapper>
      <Header>
        <Container>
          <TextLinkr>
            <h1>linkr</h1>
            <p>save, share and discover the best links on the web</p>
          </TextLinkr>
        </Container>
      </Header>
      <Form >
      <Input
          required
          type="email"
          name="email"
          placeholder="E-mail"
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <Input
          required
          type="text"
          name="username"
          placeholder="Username"
        />
        <Input
          required
          type="url"
          name="pictureUrl"
          placeholder="Picture URL"
        />
  
        <Button type="submit">
          Sign Up
          {/* {sending ? <Loading /> : "Log In"} */}
        </Button>
  
        <Link to="/">
          <LinkTo>Switch back to log in</LinkTo>
        </Link>
      </Form>
    </Wrapper>
    );
  }
  
  const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #151515;
    display: flex;
    align-items: center;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    @media screen and (min-width: 1024px) {
      flex-direction: row;
    }
  `;
  
  const Header = styled.div`
    width: 160%;
    height: 100%;
    background-color: #151515;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Passion One", cursive;
  `;
  
  const TextLinkr = styled.div`
    width: 80%;
    height: 100%;
    margin: 0 20px;
    h1 {
      font-size: 106px;
      margin-bottom: 10px;
    }
    p {
      font-size: 38px;
      font-weight: 700;
    }
  `;
  
  
  const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #333333;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  `;
  
  const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 58px;
    border-radius: 5px;
    border: none;
    margin-bottom: 6px;
    padding: 0 15px;
    margin: 5px;
    font-size: 20px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    color: #333333;
    background-color: #ffffff;
    ::placeholder {
      color: #9F9F9F;
      ;
    }
  `;
  
  const Button = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  margin: 6px 0;
  font-size: 20px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
    color: #ffffff;
    background-color: #1877f2;
    :disabled {
      background-color: #1877f2;
      opacity: 0.7;
    }
    :hover {
      cursor: pointer;
      transform: scale(1.02);
    }
  `;
  
  const LinkTo = styled.h5`
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato", sans-serif;
    margin-top: 20px;
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
    
  `;
  