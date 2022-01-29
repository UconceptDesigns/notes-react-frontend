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

// const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/notes";
const apiURL = "http://localhost:5000/notes_db/notes/";

const CustomCard = ({ item }) => {
  console.log("Key", item._id);

  const authAxios = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });

  const refreshPage = () => {
    window.location.reload();
  };
// new code testing
  const [noteTitle, setNoteTitle] = useState('');
  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  }

  const [noteDetails, setNoteDetails] = useState('');
  const handleDetailsChange = (e) => {
    setNoteDetails(e.target.value);
  }
// end new code testing

  const handleDeleteNote = () => {
    authAxios
      .delete(
        // `https://backend-capstone-janet.herokuapp.com/notes_db/notes/${item._id}`
        apiURL + `${item._id}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    refreshPage();
  };

  const handleEditNote = () => {
    authAxios
      .put(
        // `https://backend-capstone-janet.herokuapp.com/notes_db/notes/${item._id}`
        apiURL + `${item._id}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    refreshPage();
  };
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" value={noteTitle} >{item.title}</Typography>
          <Typography variant="body2" className="notes" value={noteDetails} >{item.details}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => handleDeleteNote()}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={() => handleEditNote()}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
export default CustomCard;
