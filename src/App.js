import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Users from "./components/Users";
import Notes from "./components/Notes";
import Login from "./components/Login";
// import useToken from "./components/UseToken";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export default function App() {
  // const [token, setToken] = useState();
  const token = getToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Container fixed>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}
