import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import ProfilePic from "../images/profilepic.png";
import { createPost } from "../services/linkrAPI.jsx";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ link: "", comments: "" });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  function postSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const body = { link: form.link, comments: form.comments };

    createPost(body)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setForm({ link: "", comments: "" });
        alert("Houve um erro ao publicar seu link");
      });
  }

  return (
    <Wraper>
      <ProfilePicture>
        <img src={ProfilePic} alt="" />
      </ProfilePicture>
      <Content>
        <h1>What are you going to share today?</h1>

        <form onSubmit={postSubmit}>
          <Form>
            <input
              name="link"
              type="text"
              placeholder="http://..."
              value={form.link}
              onChange={handleForm}
              required
              disabled={isLoading}
            />
            <input
              name="comments"
              type="text"
              placeholder="Awesome article about #javascript"
              value={form.comments}
              onChange={handleForm}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </Form>
        </form>
      </Content>
    </Wraper>
  );
}

const Wraper = styled.div`
  background-color: #ffffff;
  width: 611px;
  height: 209px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 29px;
`;

const ProfilePicture = styled.div`
  margin-top: 16px;
  margin-left: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Content = styled.div`
  margin-top: 21px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Lato", sans-serif;
    font-weight: 300px;
    font-size: 20px;
    color: #707070;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;

  input {
    width: 503px;
    height: 30px;
    padding-left: 12px;
    box-sizing: border-box;
    margin-top: 5px;
    background-color: ${(props) => (props.disabled ? "#F2F2F2" : "#EFEFEF")};
    color: #707070;
    border: 0px;
    border-radius: 5px;
    font-family: "Lato", sans-serif;
    font-weight: 300px;
    font-size: 15px;

    &::placeholder {
      color: #949494;
    }
  }

  input:nth-child(2) {
    height: 66px;
  }

  button {
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    font-size: 14px;
    font-family: "Lato", sans-serif;
    font-weight: 400px;
    border-radius: 5px;
    color: #ffffff;
    border: 0px;
    margin-left: 390px;
    margin-top: 5px;
    cursor: pointer;
  }
`;
