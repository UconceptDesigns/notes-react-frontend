import React, { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Login({ setToken }) {
  const [loggedName, setLoggedName] = useState();
  const [loggedEmail, setLoggedEmail] = useState();

  const [errorMessage, setErrorMessage] = useState(null);

  // const apiURL = "https://backend-capstone-janet.herokuapp.com/login";
  const apiURL = "http://localhost:5000/login";
  const authAxios = axios.create({
    baseURL: apiURL, 
  });

  var loginError = errorMessage;

  const login = async (e, errorMessage) => {
    e.preventDefault();
    authAxios
      .post(apiURL, { name: loggedName , user_email: loggedEmail})
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage(false);
          // generate token and save session storage
          const token =  sessionStorage.setItem("token",response.data.access_token);
          window.location.replace("/notes");
        } else {
          console.log('this part is not executing on returned 401');
          }
        }
      );
      setErrorMessage(true);
      console.log("ending console:", loginError);
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
            <div>
              { errorMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="warning">Invalid username or email.</Alert>
                </Stack> 
              )}
            </div>
          <div className="actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}
