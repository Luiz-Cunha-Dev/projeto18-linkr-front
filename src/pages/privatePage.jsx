import { useEffect } from "react";
import React from "react";
import { getToken } from "../services/linkrAPI.jsx";
import { useNavigate } from "react-router-dom";
import LogoutTab from "./LogoutTab.jsx";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <LogoutTab />
      {children}
    </>
  );
}
