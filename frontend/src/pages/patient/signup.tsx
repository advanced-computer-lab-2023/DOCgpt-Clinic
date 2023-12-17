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

function SignUpPatient() {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // if (
    //   !data.get("username") ||
    //   !data.get("name") ||
    //   !data.get("email") ||
    //   !data.get("password") ||
    //   !data.get("dateofbirth") ||
    //   !data.get("moblieNumber")||
    //   !data.get("emergencyContactFullName")||
    //   !data.get("emergencyContactMobileNumber")||
    //   !data.get("emergencyContactRelation")
    // )
    if(!data.get("username") ){
    setFormErrors("Please fill out username");
    return;}
    if( !data.get("name") ){
    setFormErrors("Please fill out name");
    return;}
    if( !data.get("email")  ){
    setFormErrors("Please fill out mail");
    return;}
    if( !data.get("password") ){
    setFormErrors("Please fill out password");
    return;}
    if( !data.get("dateofbirth")){
    setFormErrors("Please fill out birth date");
    return;}
    if( !data.get("mobileNumber")){
    setFormErrors("Please fill out mobileNumber");
    return;
    }
    if(  !data.get("emergencyContactFullName")){
    setFormErrors("Please fill out Emergency contact name");
    return;
    }
    if(  !data.get("emergencyContactMobileNumber")){
    setFormErrors("Please fill out emergency contact number");
    return;
}

    if( !data.get("emergencyContactRelation")){
    setFormErrors("Please fill out emergency contact number");
    return;
    }

    
    try {
      setFormErrors(null);
      const response = await axios.post("/routes/patient/postP", {
        // Adjust the field names according to your form
        username: data.get("username"),
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        dateofbirth: data.get("dateofbirth"),
        mobilenumber:data.get("mobileNumber"),
        emergencyContact: {
            fullName:data.get("emergencyContactFullName"),
            mobileNumber: data.get("emergencyContactMobileNumber"),
            relation: data.get("emergencyContactRelation"),
          }
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
               Sign up
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
                  name="mobileNumber"
                  label="mobileNumber"
                  type="text" 
                  id="mobileNumber"
                  autoComplete="mobileNumber"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="emergencyContactFullName"
                label="Emergency Contact Full Name"
                type="emergencyContactFullName"
                id="emergencyContactFullName"
            />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="emergencyContactMobileNumber"
                    label="Emergency Contact Mobile Number"
                    type="emergencyContactMobileNumber"  // Keep it as "text" since it's a string
                    id="emergencyContactMobileNumber"
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="emergencyContactRelation"
                    label="Emergency Contact Relation"
                    type="emergencyContactRelation"
                    id="emergencyContactRelation"
                />
                </Grid>

                </Grid>

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
export default SignUpPatient;