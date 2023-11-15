import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, Container,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
interface DeletePackageFormProps {
    selectedPackage: HealthPackage;
    onUpdate: () => void; 
  }
  interface HealthPackage {
    name: string;
    feesPerYear: number;
    doctorDiscount: number;
    medicineDiscount: number;
    familysubscribtionDiscount: number;
  }
  const DeletePackageForm = ({ selectedPackage, onUpdate}: DeletePackageFormProps) => {
  const [formData, setFormData] = useState({ name: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // Update formData state when selectedPackage changes
    setFormData({
      name: selectedPackage.name,
     
    });
  }, [selectedPackage]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeletePackage = async () => {
    try {
      const response = await axios.delete('/routes/admins/deletePa', { data: formData });
      setSuccessMessage('Package deleted successfully!');
      console.log('Response from deletePackageByName:', response.data);
    } catch (error) {
      setErrorMessage('Error deleting package. Please try again.');
      console.error('Error deleting package:', error);
    }
    handleDialogClose();
    onUpdate();
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Delete Health Package
      </Typography>
      <form>
        <TextField
          label="Package Name"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled
        />
        <Button variant="contained" color="secondary" onClick={handleDialogOpen}>
          Delete Package
        </Button>
        {successMessage && <Typography color="green">{successMessage}</Typography>}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </form>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ARE YOU SURE YOU WANT TO DELETE?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will permanently delete the health package.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeletePackage} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeletePackageForm;