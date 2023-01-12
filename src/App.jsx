import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userContext from "./contexts/userContexts.jsx";
import PrivatePage from "./pages/privatePage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Timeline from "./pages/Timeline.jsx";
import GlobalStyle from "./global/globalStyle.js";
import HashtagPage from "./pages/HashtagsPage.jsx"


export default function App() {
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdtoDelete, setPostIdtoDelete] = useState();

  return (
    <>
      <GlobalStyle />
      <userContext.Provider value={{ user, setUser, modalIsOpen, setIsOpen, postIdtoDelete, setPostIdtoDelete }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<PrivatePage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}
