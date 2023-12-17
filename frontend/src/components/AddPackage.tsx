import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Container, Grid, Typography,Snackbar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import DrawerAppBar from './admin Bar/adminBar';
import { useNavigate } from 'react-router-dom';
import Background from '../HealthPack.jpeg';
import Back from "./backButton";
import El7a2niAdminInfo from './El7a2niAdmin-info';

const AddPackage = () => {
  const navigate = useNavigate();

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
      const response = await axios.post('/routes/admins/addPackage', packageDetails);
      if (response.status === 201) {
        setSuccessMessage('Package has been added successfully.');
        setOpenSnackbar(true);
        // Add this line to navigate after setting the success message
        navigate('/hp');
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
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>ADD NEW PACKAGE</strong>
        </h1>
      </div>
    </div>
    <Container maxWidth="sm">
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
    <El7a2niAdminInfo/>
    </>
  );
};

export default AddPackage;