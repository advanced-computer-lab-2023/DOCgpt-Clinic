import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Snackbar } from '@mui/material';

interface HealthPackage {
  name: string;
  feesPerYear: number;
  doctorDiscount: number;
  medicineDiscount: number;
  familysubscribtionDiscount: number;
}

interface UpdatePackageFormProps {
  selectedPackage: HealthPackage;
  onUpdate: () => void; // Function to refresh the package list
  onClose: () => void; // Function to close the dialog
}

const UpdatePackageForm: React.FC<UpdatePackageFormProps> = ({ selectedPackage, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: selectedPackage.name,
    feesPerYear: selectedPackage.feesPerYear.toString(),
    doctorDiscount: selectedPackage.doctorDiscount.toString(),
    medicineDiscount: selectedPackage.medicineDiscount.toString(),
    familysubscribtionDiscount: selectedPackage.familysubscribtionDiscount.toString(),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Update formData state when selectedPackage changes
    setFormData({
      name: selectedPackage.name,
      feesPerYear: selectedPackage.feesPerYear.toString(),
      doctorDiscount: selectedPackage.doctorDiscount.toString(),
      medicineDiscount: selectedPackage.medicineDiscount.toString(),
      familysubscribtionDiscount: selectedPackage.familysubscribtionDiscount.toString(),
    });
  }, [selectedPackage]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePackage = async () => {
    try {
      // Use the name of the existing package for the update
      const response = await axios.patch('/routes/admins/updatePackage', formData);
      console.log('Response from updatePackage:', response.data);
      setOpenSnackbar(true);
      onUpdate();  // Refresh the package list
      onClose();  // Call the onUpdate callback to refresh the list
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const token = localStorage.getItem("authToken");
  if (!token) {
    return (
      <div>
        <Typography component="h1" variant="h5">
          access denied
        </Typography>
      </div>
    );
  }
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Update Health Package
      </Typography>
      <form>
        <TextField
  label="Package Name"
  fullWidth
  margin="normal"
  name="name"
  value={formData.name}
  onChange={handleChange}
  disabled // This disables the TextField
/>
        <TextField
          label="Fees Per Year"
          fullWidth
          margin="normal"
          name="feesPerYear"
          value={formData.feesPerYear}
          onChange={handleChange}
        />
        <TextField
          label="Doctor Discount"
          fullWidth
          margin="normal"
          name="doctorDiscount"
          value={formData.doctorDiscount}
          onChange={handleChange}
        />
        <TextField
          label="Medicine Discount"
          fullWidth
          margin="normal"
          name="medicineDiscount"
          value={formData.medicineDiscount}
          onChange={handleChange}
        />
        <TextField
          label="Family Subscription Discount"
          fullWidth
          margin="normal"
          name="familysubscribtionDiscount"
          value={formData.familysubscribtionDiscount}
          onChange={handleChange}
        />
        
        <Button variant="contained" color="primary" onClick={handleUpdatePackage}>
          Update Package
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Package updated successfully"
      />
    </Container>
  );
};

export default UpdatePackageForm;