import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";

export default function Trending() {
  return (
    <Wraper>
      <Content>
        <ul className="separator">
          <li>trending</li>
        </ul>
        <div>
          <h2># javascript</h2>
          <h2># react</h2>
          <h2># react-native</h2>
          <h2># material</h2>
          <h2># web-dev</h2>
          <h2># mobile</h2>
          <h2># css</h2>
          <h2># html</h2>
          <h2># node</h2>
          <h2># sql</h2>
        </div>
      </Content>
    </Wraper>
  );
}

const Wraper = styled.div`
  background-color: #171717;
  width: 301px;
  height: 406px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  margin-top: 83px;
  margin-left: 25px;
  @media (max-width: 614px) {
      display: none;
    }
`;

const Content = styled.div`
  margin-top: 9px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;

  li {
    font-family: "Oswald", sans-serif;
    font-weight: 700px;
    font-size: 27px;
    color: #ffffff;
  }

  ul.separator li::after {
    content: "";
    display: block;
    border-bottom: 1px solid #484848;
    padding-top: 12px;
    margin-left: -18px;
    width: 302px;
  }
  div {
    margin-top: 22px;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-weight: 700px;
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 10px;
  }
`;
