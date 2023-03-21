import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigation } from "../Navigation";

export const Header = () => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setAnchorEl(event.currentTarget);
  };

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
            sx={{ flex: 1 }}
          >
            Events App
          </Typography>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <LockIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            Sign In
          </Button>
        </Toolbar>

        <Navigation />
      </header>
    </>
  );
};
