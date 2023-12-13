import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UpdatePackageForm from "../components/UpdatePackageForm";
import DeletePackageForm from "../components/DeletePackageForm";
import DrawerAppBar from "./admin Bar/adminBar";
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
  const [currentPackage, setCurrentPackage] = useState<HealthPackage | null>(
    null
  );

  const refreshHealthPackages = async () => {
    try {
      const response = await axios.get("/routes/patient/viewHealthPackage");
      setHealthPackages(response.data.healthPackages);
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
  const handleDeletePackage = async (packageName: string) => {
    if (window.confirm(`Are you sure you want to delete ${packageName}?`)) {
      try {
        await axios.delete(
          `/routes/patient/deleteHealthPackage/${packageName}`
        );
        refreshHealthPackages();
      } catch (error) {
        console.error("Error deleting package", error);
      }
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container sx={{ marginTop: "50px" }}>
        {healthPackages.map((healthPackage) => (
          <Card
            style={{ padding: "20px", margin: "20px" }}
            key={healthPackage.name}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  Package Name: {healthPackage.name}
                </Typography>
                <Typography>
                  feesPerYear: {healthPackage.feesPerYear}
                </Typography>
                <Typography>
                  doctorDiscount: {healthPackage.doctorDiscount}
                </Typography>
                <Typography>
                  medicineDiscount: {healthPackage.medicineDiscount}
                </Typography>
                <Typography>
                  familysubscribtionDiscount:{" "}
                  {healthPackage.familysubscribtionDiscount}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleOpenUpdateDialog(healthPackage)}
                >
                  Update
                </Button>
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleOpenDeleteDialog(healthPackage)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
        <Dialog
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            {currentPackage && (
              <>
                <UpdatePackageForm
                  selectedPackage={currentPackage}
                  onUpdate={refreshHealthPackages}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            {currentPackage && (
              <>
                <DeletePackageForm
                  selectedPackage={currentPackage}
                  onUpdate={refreshHealthPackages}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default HealthPackages;
