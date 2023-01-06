import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/linkrAPI.jsx";
import Loading from "../commons/Loading.jsx";
import { Container } from "../global/fonts.js";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("linkr") !== null) {
      navigate("/timeline");
    }
  }, [navigate]);

  function loginSubmit(e) {
    e.preventDefault();
    setDisabled(true);

    const body = { email: email, password: password };

    login(body)
      .then((res) => {
        localStorage.setItem("linkr", JSON.stringify(res.data.token));
        navigate("/timeline");
      })
      .catch((err) => {
        alert("Erro ao fazer login. E-mail ou senha incorretos.");
        console.log(err);
        setDisabled(false);
        setEmail("");
        setPassword("");
      });
  }

  return (
    <Wrapper>
      <Header>
        <Container>
          <TextLinkr>
            <h1>linkr</h1>
            <p>save, share and discover the best links on the web</p>
          </TextLinkr>
        </Container>
      </Header>
      <Form onSubmit={loginSubmit}>
        <Input
          disabled={disabled}
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          disabled={disabled}
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <Button type="submit" disabled={disabled}>
          {disabled ? <Loading /> : "Log In"}
        </Button>

        <Link to="/sign-up">
          <LinkTo>First time: Create an account!</LinkTo>
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
  @media (max-width: 614px) {
    flex-direction: column;
    overflow-y: scroll;
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
  @media (max-width: 614px) {
    width: 100%;
    height: 50%;
    margin-bottom: 20px;
  }
`;

const TextLinkr = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 20px;
  h1 {
    margin: 0 40px;
    font-size: 106px;
    margin-bottom: 10px;
    animation: fadeIn 3s;
  }
  p {
    margin: 0 40px;
    font-size: 36px;
    font-weight: 700;
    animation: fadeIn 2s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 614px){
    width: 100%;
    height: 50%;
    margin: 0;
    h1 {
      text-align: center;
    }
    p {
      text-align: center;
      font-size: 28px;
      margin: 0 10px;
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
  animation: fadeIn 1s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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
    color: #9f9f9f;
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
  display: flex;
  justify-content: center;
  align-items: center;
  :disabled {
    background-color: #1877f2;
    opacity: 0.7;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.01);
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



