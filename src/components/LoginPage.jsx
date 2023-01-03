import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/linkrAPI.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("linkr") !== null) {
      navigate("/timeline");
    }
  }, [navigate]);

  function loginSubmit(e) {
    e.preventDefault();
    setSending(true);

    const body = { email: email, password: password };

    login(body)
      .then((res) => {
        localStorage.setItem("linkr", JSON.stringify(res.data));
        navigate("/timeline");
      })
      .catch((err) => {
        alert("Erro ao fazer login. Tente novamente.");
        console.log(err);
        setSending(false);
        setEmail("");
        setPassword("");
      });
  }

  return(
  <Wrapper>
    <Header>
      <h1>Linkr</h1>
      <p>save, share and discover the best links on the web</p>
    </Header>
    <Form onSubmit={loginSubmit}>
      <Input
        disabled={sending}
        required
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <Input
        disabled={sending}
        required
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button type="submit" disabled={sending}>
        {/* {sending ? <loading /> : "Log In"} */}
      </Button>

      <Link to="/sign-up">
        <h5>First time: Create an account!</h5>
      </Link>
    </Form>
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #151515;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 58px;
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  margin-bottom: 6px;
  font-size: 20px;
  color: #ffffff;
  background-color: #252525;
  ::placeholder {
    color: #ffffff;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 5px;
  border: none;
  margin-bottom: 6px;
  font-size: 20px;
  color: #ffffff;
  background-color: #1877f2;
  :disabled {
    background-color: #1877f2;
    opacity: 0.7;
  }
`;
