import React, { useState, useEffect } from "react";
// import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";
// const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";
const apiURL = "http://localhost:5000/notes_db/notes";
export default function FormDialog({ token, onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState({
    title: "",
    details: "",
    user_email: "",
  });
  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });

  const [email, setEmail] = useState(false);

  const getEmail = () => {
    if (token != null && token != "") {
      let email_jwt = jwt_decode(token);
      setEmail(email_jwt.sub);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnSubmit = (e) => {
    console.log("From FormDialog ", note.title, note.details, note.email);
    onSubmit(note.title, note.details, note.email);
    e.preventDefault();
    if (note) {
      authAxios
        .post(apiURL, {
          title: note.title,
          details: note.details,
          user_email: note.email,
        }) //{object note}
        .then((response) => {
          if (response.status === 201) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setOpen(false);
        });
    }
  };
  useEffect(() => {
    if (!open) {
      getEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  return (
    <div className="btn-add-note">
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Add Note</DialogTitle>
        <form onSubmit={handleOnSubmit}>
          <DialogContent>
            <DialogContentText>
              Type your note details below...
            </DialogContentText>
            <TextField
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              onChange={(e) => setNote({ ...note, details: e.target.value })}
              multiline
              rows={4}
              margin="dense"
              id="details"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOnSubmit}>Add Note</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}