import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./global/globalStyle";
import userContext from "./contexts/userContexts.jsx";
import PrivatePage from "./pages/privatePage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Timeline from "./pages/Timeline.jsx";

export default function App() {
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <userContext.Provider value={{ user, setUser, modalIsOpen, setIsOpen }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:id" element={<PrivatePage />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}
