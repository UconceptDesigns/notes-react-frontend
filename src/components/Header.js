import React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";

const Header = (props) => {
  const handleLogOut = () => {
    sessionStorage.clear();
  };

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="note-app-title"
              >
                My Notes
              </Typography>
              <Button color="inherit" onClick={handleLogOut}>
                Logout
              </Button>
              {/* <Button color="inherit" onClick={<Login />}>
                Login
              </Button> */}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
