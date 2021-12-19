import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import UsersCards from "./UsersCards";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const apiURL = "https://backend-capstone-janet.herokuapp.com/notes_db/users";
  const data = async () => {
    axios
      .get(apiURL)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
      });
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
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <Grid container spacing={3}>
              {users.length === 0 ? (
                <div className="prompt-title">
                  <Typography variant="h3" color="textSecondary" component="p">
                    Users...
                  </Typography>
                </div>
              ) : (
                users.map((item) => (
                  <Grid item md={4} sm={6} xs={12} key={item.id}>
                    <UsersCards item={item} key={item.id} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
