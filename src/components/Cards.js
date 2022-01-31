import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";
const apiURL = "http://localhost:5000/notes_db/notes";

const CustomCard = ({ item }) => {
  const authAxios = axios.create({
    baseURL: apiURL,
    method: 'PUT',
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });

  const [open, setOpen] = useState(false);

  const [addCardData, setAddCardData] = useState ({
    _id: item._id,
    title: item.title,
    details: item.details,
    user_email: item.user_email,
  })

  const handleAddCardChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newCardData = { ...addCardData };
    newCardData[fieldName] = fieldValue;

    setAddCardData(newCardData);
  };
  
  const handleEditNote = (e) => {
     handleClickOpen(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleUpdateNote = (event) => {
    event.preventDefault();
    // setNote(addCardData);
    updateDatabase(addCardData);

    // console.log("addCardData id: ", addCardData._id);
  };
 
  const updateDatabase = (addCardData) => {
    
    authAxios
      .put(
        apiURL + `/${addCardData._id}`, addCardData
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
      refreshPage();
      handleClose();
      
  };
  
  const handleDeleteNote = () => {
    authAxios
      .delete(
        apiURL + `/${item._id}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    refreshPage();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {open ? (
        <div className="btn-add-note">
            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
              <DialogTitle>Edit Note</DialogTitle>
              <form onSubmit={handleUpdateNote}>
                <DialogContent>
                  <DialogContentText>
                    Edit your note details below...
                  </DialogContentText>
                  <TextField
                    onChange={handleAddCardChange}
                    value = {addCardData.title}
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                  />
                  <TextField
                    onChange={handleAddCardChange}
                    value = {addCardData.details}
                    multiline
                    rows={4}
                    margin="dense"
                    name="details"
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
                  <Button onClick={handleUpdateNote}>Save Note</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        ) : (
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" name="title" >{item.title}</Typography>
              <Typography variant="body2" className="notes" name="details" >{item.details}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleDeleteNote()}>
              Delete
            </Button> 
            <Button size="small" color="primary" onClick={() => handleEditNote()} >
              Edit
            </Button>    
          </CardActions>
        </Card>
        )}
    </div>
  );
};
export default CustomCard;