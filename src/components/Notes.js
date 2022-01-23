import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CustomCard from "./Cards";
import FormDialog from "./FormDialog";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Notes({ token }) {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  // const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";
  const apiURL = "http://localhost:5000/notes_db/notes";

  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
  // console.log("token being passed to Notes befor Axios :", token);
  const data = async () => {
    try {
      // fetch notes
      const result = await authAxios.get(apiURL);
      setNotes(result.data);
      setOpen(true);
    } catch (err) {
      //set request error message
      console.log(err.message);
    }
  };

  const [email, setEmail] = useState();

  const getEmail = () => {
    if (token !== null && token !== "") {
      let email_jwt = jwt_decode(token);
      setEmail(email_jwt.sub);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleAddNote = (title, details) => {
    console.log("Title:", title);
    console.log("Details: ", details);
    console.log("Details: ", email);
    getEmail();
    const newNote = {
      title: title,
      details: details,
      // user_email: email,
    };
    const newNoteData = notes.concat(newNote);
    setNotes(newNoteData);
  };

  const handleDeletedNote = (key) => {
    const newNoteData = notes.filter((item) => item._id !== key);
    setNotes(newNoteData);
    refreshPage();
  };

  useEffect(() => {
    console.log("here notes", token);
    console.log("token decode", jwt_decode(token));
    if (!open) {
      getEmail();
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  return (
    <div className="App">
      <div>
        {!open ? (
          <CircularProgress variant="determinate" />
        ) : (
          <div>
            <Grid container spacing={3}>
              {notes.length === 0 ? (
                <div className="prompt-title">
                  <Typography variant="h3" color="textSecondary" component="p">
                    <p className="no-notes">Add a Note...</p>
                  </Typography>
                </div>
              ) : (
                notes.map((item) => (
                  <Grid item md={4} sm={6} xs={12} key={item._id}>
                    <CustomCard
                      item={item}
                      key={item._id}
                      onDelete={handleDeletedNote}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        )}
        <FormDialog onSubmit={handleAddNote} />
      </div>
    </div>
  );
}
export default Notes;
