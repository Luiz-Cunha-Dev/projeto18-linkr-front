import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./global/globalStyle.js";
import userContext from "../src/contexts/userContexts.jsx";
import PrivatePage from "../src/components/privatePage.jsx";
import LoginPage from "../src/components/LoginPage.jsx";
import CreatePost from "./components/CreatePost.jsx";

export default function App() {
  const [user, setUser] = useState({});

  return (
    <GlobalStyle>
      <userContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<h1>SignUp</h1>} />
            <Route
              path="/timeline"
              element={
                <PrivatePage>
                  <h1>Timeline</h1>
                  <CreatePost />
                </PrivatePage>
              }
            />
            <Route
              path="/user"
              element={
                <PrivatePage>
                  <h1>UserPage</h1>
                </PrivatePage>
              }
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </GlobalStyle>
  );
}
