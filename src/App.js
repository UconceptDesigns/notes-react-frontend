import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Notes from "./components/Notes";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState("");
  const [isToken, setIsToken] = useState(false);


  const userLogin = (tok) => {
    setToken(tok);
  };

  const getToken = () => {
    const valueToken = sessionStorage.getItem('token');

    if (valueToken !== null || valueToken !== "") {
      setToken(valueToken);
      setIsToken(true);
    }
  };

  useEffect(() => {
    getToken();
  }, [token, isToken]);

  if (!isToken) {
    return <Login setToken={userLogin}/>;
  } 

  return (
    <div className="App">
      <Header token={token} />
      <BrowserRouter>
        <Container fixed>
          <Routes>
            <Route exact path="/" element={<Login userLogin={userLogin} />} />
            <Route path="/notes" element={<Notes token={token} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}
