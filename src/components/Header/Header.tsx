import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigation } from "../Navigation";
import axios from "axios";
import { createContext, useState } from "react";
import { redirect } from "react-router-dom";

export const Header = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <>
      <header>
        <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            aria-label="App name"
            sx={{ flex: 1 }}
          >
            Events App
          </Typography>

          <IconButton size="small" sx={{ ml: 2 }}>
            <AccountBoxIcon fontSize="large" />
          </IconButton>
          {token ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => (
                localStorage.removeItem("accessToken"), window.location.reload()
              )}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In
            </Button>
          )}
        </Toolbar>

        <Navigation />
      </header>
    </>
  );
};
