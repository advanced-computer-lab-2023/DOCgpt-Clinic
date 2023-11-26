import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";

// Define the types for your data
interface FamilyMemberPackage {
  familyMemberName: string;
  package: {
    name: string;
    startdate: string;
    enddate: string;
    status: string;
  };
}

const UnsubscribePackageForMember: React.FC = () => {
  const [familyMembersAndPackages, setFamilyMembersAndPackages] = useState<
    FamilyMemberPackage[] | null
  >(null);
  const [selectedPackage, setSelectedPackage] =
    useState<FamilyMemberPackage | null>(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  const handleUnsubscribe = async (
    familyMember: FamilyMemberPackage | null
  ) => {
    try {
      if (!familyMember) {
        console.error("Selected package is null");
        return;
      }

      const token = localStorage.getItem("authToken");

      console.log(familyMember.familyMemberName);
      const response = await axios.patch(
        "/routes/cancelSubscriptionfam",
        {
          familyname: familyMember.familyMemberName,
          packageName: familyMember.package.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming your backend returns updated familyMembersAndPackages
      setFamilyMembersAndPackages(response.data.familyMembersAndPackages);
    } catch (error) {
      console.error("Error unsubscribing:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response: AxiosResponse = await axios.get(
          "/routes/viewFamMemberPackages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        console.log(response.data);
        setFamilyMembersAndPackages(response.data.familyMemberPackages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography
        color="primary"
        style={{ textAlign: "center" }}
        variant="h4"
        gutterBottom
      >
        Unsubscribe Packages for Family Members
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(familyMembersAndPackages) &&
          familyMembersAndPackages.map(
            (item: FamilyMemberPackage, index: number) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Paper style={{ padding: "20px" }}>
                  <Typography variant="h6">{item.familyMemberName}</Typography>
                  <Typography>Package: {item.package.name}</Typography>
                  <Typography>Status: {item.package.status}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSelectedPackage(item);
                      setConfirmationDialogOpen(true);
                    }}
                  >
                    Unsubscribe
                  </Button>
                </Paper>
              </Grid>
            )
          )}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Unsubscribe</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to unsubscribe from the package for{" "}
            {selectedPackage?.familyMemberName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUnsubscribe(selectedPackage);
              setConfirmationDialogOpen(false);
            }}
            color="secondary"
          >
            Unsubscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UnsubscribePackageForMember;
