import * as React from "react";
import { useNavigate } from "react-router-dom";

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
import UploadAndSubmitReqDocs from "../../components/uploadandSubmitReqDocs";

import axios from "axios";

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

function SignUpDoctor() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      !data.get("username") ||
      !data.get("name") ||
      !data.get("email") ||
      !data.get("password") ||
      !data.get("dateofbirth") ||
      !data.get("hourlyrate") ||
      !data.get("affiliation") ||
      !data.get("speciality") ||

      !data.get("educationalBackground")
    ) {
      setFormErrors("Please fill out all fields");
      return;
    }
    try {
      setFormErrors(null);
      const response = await axios.post("/routes/doctors/postDoctor", {
        // Adjust the field names according to your form
        username: data.get("username"),
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        dateOfBirth: data.get("dateofbirth"),
        hourlyRate: data.get("hourlyrate"),
        affiliation: data.get("affiliation"),
        speciality:data.get("speciality"),
        educationalBackground: data.get("educationalBackground"),
      });

      // Handle the response from the back-end as needed, e.g., show a success message or redirect the user.
      console.log("patient registered successfully :", response);
      navigate("/");
      // You can also redirect the user to the login page after a successful sign-up
      // history.push("/login"); // You need to import useHistory from 'react-router-dom'
    } catch (error) {
      console.error("Request failed:", error);
      // Handle errors, e.g., display an error message to the user.
    }
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
}

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
            Request to join the platform
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="dateofbirth"
                  label="Date of birth"
                  type="dateofbirth"
                  id="dateofbirth"
                  autoComplete="dateofbirth"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="hourlyrate"
                  label="Hourly rate"
                  type="hourlyrate"
                  id="hourlyrate"
                  autoComplete="hourlyrate"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="affiliation"
                  label="Affiliation"
                  type="affiliation"
                  id="affiliation"
                  autoComplete="affiliation"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="speciality"
                  label="speciality"
                  type="speciality"
                  id="speciality"
                  autoComplete="speciality"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="educationalBackground"
                  label="Educational Background"
                  type="educationalBackground"
                  id="educationalBackground"
                  autoComplete="educationalBackground"
                />
              </Grid>
             

                </Grid>
                <UploadAndSubmitReqDocs />


            {formErrors && (
              <Typography color="error" align="center">
                {formErrors}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Sign up 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUpDoctor;