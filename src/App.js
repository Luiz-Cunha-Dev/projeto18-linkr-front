import React from "react";
import Globalstyle from "./styles/Globalstyle.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Timeline from "./pages/Timeline.js";

export default function App() {
  return (
    <BrowserRouter>
      <Globalstyle />
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
}
