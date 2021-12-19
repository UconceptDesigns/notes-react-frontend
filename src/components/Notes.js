import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CustomCard from "./Cards";
import FormDialog from "./FormDialog";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function Notes({ isLogin }) {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";
  const data = async () => {
    axios
      .get(apiURL)
      .then((response) => {
        console.log(response);
        setNotes(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
  };

  const handleAddNote = (title, details) => {
    console.log("Title:", title);
    console.log("Details:", details);
    const newNote = {
      title: title,
      details: details,
      user_email: "janetgarcia007@gmail.com",
    };
    const newNoteData = notes.concat(newNote);
    setNotes(newNoteData);
  };

  const handleDeletedNote = (key) => {
    const newNoteData = notes.filter((item) => item._id !== key);
    setNotes(newNoteData);
  };

  useEffect(() => {
    if (!open) {
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
