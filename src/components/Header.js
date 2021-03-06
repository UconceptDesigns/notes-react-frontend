import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ token }) => {
  const handleLogOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="note-app-title"
              >
                My Notes
              </Typography>
              {token != null && (
                <Button color="inherit" onClick={handleLogOut}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
