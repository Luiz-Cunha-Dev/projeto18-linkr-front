import { useEffect } from "react";
import React from "react";
import { getToken } from "../services/linkrAPI.jsx";
import { useNavigate } from "react-router-dom";

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
      <h1>Top Menu</h1>
      {children}
    </>
  );
}
