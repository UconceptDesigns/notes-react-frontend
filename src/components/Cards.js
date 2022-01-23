import * as React from "react";
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
  };
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2">{item.details}</Typography>
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
