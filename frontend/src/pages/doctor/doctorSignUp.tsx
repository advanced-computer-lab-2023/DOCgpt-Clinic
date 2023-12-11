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
  const [file, setFile] = React.useState<File[]>([]);
  const [documentName, setDocumentName] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [submittedDocuments, setSubmittedDocuments] = React.useState<string[]>([]);
  // const [displayDocuments, setDisplayDocuments] = React.useState(false);
  const [fileInputs, setFileInputs] = React.useState<{ id: number; file: File | null }[]>([{ id: 1, file: null }]);


  function handleDocumentNameChange(value: string): void {
    setDocumentName(value);
  }

  // const handleDisplayDocuments = () => {
  //   setDisplayDocuments((prevDisplay) => !prevDisplay);
  // };  

  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFileInputs = fileInputs.map((input) =>
        input.id === id ? { ...input, file: e.target.files![0] } : input
      );
      setFileInputs(newFileInputs);
    }
  };
  

// Function to add a new file input
const addFileInput = () => {
  const newId = fileInputs.length + 1;
  setFileInputs([...fileInputs, { id: newId, file: null }]);
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  
    if (
      !formData.get("username") ||
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("dateofbirth") ||
      !formData.get("hourlyrate") ||
      !formData.get("affiliation") ||
      !formData.get("speciality") ||
      !formData.get("educationalBackground")
    ) {
      setFormErrors("Please fill out all fields");
      return;
    }
  
    try {
      setFormErrors(null);
  
      // Post doctor information to create a new doctor
      const response = await axios.post("/routes/doctors/postDoctor", {
        username: String(formData.get("username")),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        dateOfBirth: formData.get("dateofbirth"),
        hourlyRate: formData.get("hourlyrate"),
        affiliation: formData.get("affiliation"),
        speciality: formData.get("speciality"),
        educationalBackground: formData.get("educationalBackground"),
      });
  
      // Store the username in local storage
      localStorage.setItem("doctorUsername", String(formData.get("username")));
  
      console.log("doctor registered successfully:", response);
      navigate("/contract");
  
      // Handle file uploads
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      const files = fileInput?.files;
  
      if (files && files.length > 0 && localStorage.getItem("doctorUsername")) {
        const uploadPromises = Array.from(files).map(async (file) => {
          const fileFormData = new FormData();
          fileFormData.append("file", file);
          fileFormData.append("username", localStorage.getItem("doctorUsername") || "");
  
          // Upload the file and update doctor's documents array
          await axios.post("http://localhost:9000/routes/doctors/upload", fileFormData);
  
          return file.name; // Return the name of the uploaded file
        });
  
        // Wait for all files to be uploaded
        const uploadedFiles = await Promise.all(uploadPromises);
  
        // Update state with submitted document names
        setSubmittedDocuments(uploadedFiles);
      }
  
      console.log("after contract");
    } catch (error: any) {
      console.error("Request failed:", error);
      console.log("Error details:", error.response);
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
             
              <Grid item xs={12}>
                <Typography variant="h6">Submit Documents</Typography>
                <TextField
                  label="Document Name"
                  value={documentName}
                  onChange={(e) => handleDocumentNameChange(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                />
                 {fileInputs.map((input) => (
  <div key={input.id}>
    <input
      type="file"
      accept=".pdf, .jpg, .jpeg, .png, .docx"
      onChange={(e) => handleFileChange(input.id, e)}
    />
    {input.file && <Typography>{input.file.name}</Typography>}
  </div>
))}

<Button variant="contained" onClick={addFileInput}>
  Add Another File
</Button>
                {/* <Button variant="contained" onClick={handleDisplayDocuments}>
                  Display Documents
                </Button> */}

                {/* {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                {displayDocuments && (
                  <div>
                    <Typography variant="h6">Submitted Documents</Typography>
                    <ul>
                      {submittedDocuments.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )} */}

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
export default SignUpDoctor;


