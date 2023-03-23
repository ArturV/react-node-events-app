import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useContext, createContext } from "react";
//import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { SyntheticEventData } from "react-dom/test-utils";

export const SignIn = () => {
  //const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(email, password);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signin",
        //JSON.stringify({ email, password }),
        { email, password },
        {
          withCredentials: true,

          headers: {
            //  Authorization: "Bearer " + localStorage.getItem("accessToken"),
            //Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBhcnQubHQiLCJpYXQiOjE2Nzk1ODk2ODd9.FHfyhFvQfyMdlISzW6u4yYQn2rP1LZsEA7woLCfgHwI",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setEmail("");
        setPassword("");
      } else console.log("error");

      // console.log(JSON.stringify(response?.data));

      // console.log(JSON.stringify(response));

      //const accessToken = await response?.data?.accessToken;

      //setAuth({ email, password, accessToken });
      //  setEmail("");
      // setPassword("");
      //  setSuccess(true);}
    } catch (error) {
      console.log(error);
    }

    //   try {
    //     const response = await fetch("http://localhost:5000/api/auth/login", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ email, password }),
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //  }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
