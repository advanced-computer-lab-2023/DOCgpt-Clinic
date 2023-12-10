import * as React from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        el72ani
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SignIn() {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post("/api/login", {
        username: data.get("username"),
        password: data.get("password"),
      });
      const token = response.data.token;
      const username = response.data.username;
      console.log(token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      const role = response.data.role;
      const user = response.data.user;
      console.log(user);

      console.log(role);
      console.log("succes");
      if (role == "patient") {
        navigate(`/patient/home`);
      }
      if (role == "doctor") {
        navigate(`/doctor/todayapp`);
      }
      if (role == "admin") {
        navigate(`/admin/home`);
      }
      // Handle the response from the back-end (e.g., save the token and navigate to another page).
      // You can use state management libraries like Redux or React context to manage the token and user data.
    } catch (error) {
      console.error("Login failed:", error);
      console.log(error); // Add this line to log the complete error object
    
      // Display an alert for wrong username or password
      setOpenAlert(true);

    }
  };
  // const handleSnackbarClose = () => {
  //   setOpenAlert(false);
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "grey" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account?  Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar
            open={openAlert}
            autoHideDuration={2000}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert severity="error" sx={{ width: '100%', fontSize: '1.5rem' }}>
                Wrong Username Or Password
            </MuiAlert>
        </Snackbar>
    </ThemeProvider>
  );
}
