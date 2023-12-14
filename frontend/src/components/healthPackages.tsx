import { Box, Button, Card, Container, Grid, Typography, Snackbar, Alert, Menu, MenuItem, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import UpdatePackageForm from "../components/UpdatePackageForm";
import DeletePackageForm from '../components/DeletePackageForm';
import DrawerAppBar from "./admin Bar/adminBar";
import El7a2niInfo from './El7a2ni-info';
import AddPackage from './Package';
interface HealthPackage {
  name: string;
  feesPerYear: number;
  doctorDiscount: number;
  medicineDiscount: number;
  familysubscribtionDiscount: number;
}


const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState<HealthPackage[]>([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<HealthPackage | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<HealthPackage | null>(null);
  const [openAddPackageDialog, setOpenAddPackageDialog] = useState(false);



  const refreshHealthPackages = async () => {
    try {
      const response = await axios.get('/routes/patient/viewHealthPackage');
      setHealthPackages(response.data.healthPackages); // Set the state with the fetched data
      handleCloseConfirmDialog();
    } catch (error) {
      console.log("Error", error);
    }
  };
  

  useEffect(() => {
    refreshHealthPackages();
  }, []);

  const handleOpenUpdateDialog = (packageData: HealthPackage) => {
    setCurrentPackage(packageData);
    setOpenUpdateDialog(true);
  };

  const handleOpenConfirmDialog = (packageData: HealthPackage) => {
    setPackageToDelete(packageData);
    setOpenConfirmDialog(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    refreshHealthPackages(); // Refresh the list after closing the dialog
  };
  const handleOpenDeleteDialog = (packageData: HealthPackage) => {
    setCurrentPackage(packageData);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    refreshHealthPackages(); // Refresh the list after closing the dialog
  };

  const handleDeletePackage = async () => {
    if (packageToDelete) {
      try {
        const response = await axios.delete(`/routes/admins/deleteHealthPackage/${packageToDelete.name}`);
        if (response.status === 200) {
          // Assuming you want to do this only if the response is successful
          setHealthPackages(currentPackages => 
            currentPackages.filter(p => p.name !== packageToDelete.name)
          );
          handleCloseConfirmDialog();
        } else {
          console.error('Failed to delete package:', response.data.message);
        }
      } catch (error) {
        console.error("Error deleting package", error);
      }
    }
  };
  

  return (
    <>

      <DrawerAppBar />
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center', marginBottom: '30px' }}>
  Available Health Packages
  <Button 
    variant="contained" 
    color="primary" 
    onClick={() => setOpenAddPackageDialog(true)}
    style={{ marginLeft: '20px' }} // Adjust the style as needed
  >
    Add New Package
  </Button>
</Typography>

        <Grid container spacing={2} justifyContent="center">
          {healthPackages.map((healthPackage) => (
            <Grid item xs={12} sm={6} md={4} key={healthPackage.name}>
              <Card
                raised
                sx={{
                  maxWidth: 345,
                  m: 2,
                  boxShadow: 3,
                  minHeight: 280,
                  '&:hover': {
                    boxShadow: 5,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                    {healthPackage.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    ${healthPackage.feesPerYear} / year
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Appointment Discount: {healthPackage.doctorDiscount}%
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Medicine Discount: {healthPackage.medicineDiscount}%
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Family Subscription Discount: {healthPackage.familysubscribtionDiscount}%
                  </Typography>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2, mt: -2 }}>
  <Button
    variant="contained"
    color="primary"
    sx={{ borderRadius: '20px' }}
    onClick={() => handleOpenUpdateDialog(healthPackage)}
  >
    Update
  </Button>
  <Dialog open={openAddPackageDialog} onClose={() => setOpenAddPackageDialog(false)} maxWidth="md" fullWidth>
  <DialogContent>
    <AddPackage />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenAddPackageDialog(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
  <Button
  variant="contained"
  color="error"
  sx={{ borderRadius: '20px' }}
  onClick={() => handleOpenConfirmDialog(healthPackage)}
>
  Delete
</Button>

</Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog} maxWidth="md" fullWidth>
  <DialogContent>
    {currentPackage && (
      <UpdatePackageForm
        selectedPackage={currentPackage}
        onUpdate={refreshHealthPackages}
        onClose={handleCloseUpdateDialog} // Passing the function to close the dialog
      />
    )}
  </DialogContent>
</Dialog>

        <Dialog
  open={openConfirmDialog}
  onClose={handleCloseConfirmDialog}
>
  <DialogTitle>{"Are you sure you want to delete this package?"}</DialogTitle>
  <DialogContent>
    <DialogContentText>
      This action cannot be undone.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseConfirmDialog} color="primary">
      No
    </Button>
    <Button onClick={handleDeletePackage} color="primary" autoFocus>
      Yes
    </Button>
  </DialogActions>
</Dialog>
      </Container>
      <El7a2niInfo/>
    </>

  );
};

export default HealthPackages;