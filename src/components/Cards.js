import React from "react";

import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const CustomCard = ({ item }) => {
  const handleDeleteNote = () => {
    axios
      .delete(
        `https://backend-capstone-janet.herokuapp.com/notes_db/notes/${item._id}`
      )
      .then((response) => {
        console.log(response);
        window.location.reload(false);
        console.log(response.data);
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
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
export default CustomCard;
