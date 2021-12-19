import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomCard = ({ item }) => {
  const [user, setUser] = useState(0);
  const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/users/";
  const onDelete = async () => {
    axios
      .delete(apiURL + user)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setUser(item.user_email);
  }, []);
  console.log(item.user_email);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{item.user_email}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => onDelete(item.user_id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default CustomCard;
