import React, { useState } from "react";
import axios from "axios";
// import userLogin from "../App";

export default function Login({ setToken }) {
  const [loggedName, setLoggedName] = useState();
  const [loggedEmail, setLoggedEmail] = useState();

  // const apiURL = "https://backend-capstone-janet.herokuapp.com/login";
  const apiURL = "http://localhost:5000/login";
  const authAxios = axios.create({
    baseURL: apiURL,
   
  });
  const login = async (e) => {
    e.preventDefault();
    authAxios
      .post(apiURL, { name: loggedName , user_email: loggedEmail})
      .then((response) => {
        if (response.status === 200) {
          // generate token and save session storage
          const token =  sessionStorage.setItem("token",response.data.access_token);
          console.log(token);
          window.location.replace("/notes");
        } else {
          console.log("Incorrect username or email");
        }
      });
  };
  return (
    <div>
      <section className="auth">
        <h1>Login</h1>
        <form onSubmit={login}>
          <div className="control">
            <label>Name</label>
            <input
              type="text"
              required
              onChange={(e) => setLoggedName(e.target.value)}
            />
          </div>
          <div className="control">
            <label>Your Email</label>
            <input
              type="email"
              required
              onChange={(e) => setLoggedEmail(e.target.value)}
            />
          </div>
          <div className="actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}
