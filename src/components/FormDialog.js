import React from "react";
import axios from "axios";
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
const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";

export default function FormDialog({ onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState({
    title: "",
    details: "",
    user_email: "janetgarcia007@gmail.com",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e) => {
    onSubmit(note.title, note.details);
    e.preventDefault();
    if (note) {
      axios
        .post(apiURL, {
          title: note.title,
          details: note.details,
          user_email: "janetgarcia007@gmail.com",
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
