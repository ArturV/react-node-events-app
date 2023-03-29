import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigation } from "../Navigation";
import type { FC } from "react";

export const Header: FC = () => {
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
                localStorage.removeItem("accessToken"),
                (window.location.href = "/signin")
              )}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outlined"
              aria-label="Sign in"
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
