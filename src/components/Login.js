import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useToken from "./UseToken";

export default function Login({ setToken }) {
  const [loggedName, setLoggedName] = useState();
  const [loggedEmail, setLoggedEmail] = useState();
  // const [token, setToken] = useState();

  async function loginUser(credentials) {
    axios
      .post(
        "http://localhost:3000/notes_db/user/login",
        // "https://backend-capstone-janet.herokuapp.com/notes_db/user/login",
        {
          name: loggedName,
          user_email: loggedEmail,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // generate token and save session storage
          setToken(response.data);
          console.log(response.data);
          window.location.replace("/notes");
          // history("/notes");
        } else {
          window.location.replace("/");
          console.log("Email not found");
        }
      });
  }

  return (
    <div>
      <section className="auth">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
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
