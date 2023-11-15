import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Container, Grid, Typography,Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import DrawerAppBar from './admin Bar/adminBar';
const AddPackage = () => {
   
  const [packageDetails, setPackageDetails] = useState({
    name: '',
    feesPerYear: '',
    doctorDiscount: '',
    medicineDiscount: '',
    familysubscribtionDiscount: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send the package details to the backend
      const response = await axios.post('/routes/admins/addPackage', packageDetails);

      if (response.status === 201) {
        // Package added successfully
        setSuccessMessage('Package has been added successfully.');
        setOpenSnackbar(true);
      } else {
        console.error('Failed to add package:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
    <DrawerAppBar/>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add New Package
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Package Name"
              name="name"
              variant="outlined"
              required
              value={packageDetails.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fees Per Year"
              name="feesPerYear"
              variant="outlined"
              required
              value={packageDetails.feesPerYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Doctor Discount"
              name="doctorDiscount"
              variant="outlined"
              required
              value={packageDetails.doctorDiscount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Medicine Discount"
              name="medicineDiscount"
              variant="outlined"
              required
              value={packageDetails.medicineDiscount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Family Subscription Discount"
              name="familysubscribtionDiscount"
              variant="outlined"
              required
              value={packageDetails.familysubscribtionDiscount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
            >
              Save Package
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </Container>
    </>
  );
};

export default AddPackage;