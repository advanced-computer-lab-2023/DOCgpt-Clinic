import {
  Card,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";

interface HealthPackage {
  name: string;
  feesPerYear: number;
  doctorDiscount: number;
  medicineDiscount: number;
  familysubscribtionDiscount: number;
}

interface HealthPackageProps {
  healthPackage: any;
  healthPackages: HealthPackage[];
}

const HealthPackageComp = ({
  healthPackage,
  healthPackages,
}: HealthPackageProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (target: string, packageName: string) => {
    setAnchorEl(null);

    if (target === "myself" && packageName) {
      if (Array.isArray(healthPackages)) {
        const isSubscribed = healthPackages.some((p) => p.name === packageName);
        if (isSubscribed) {
          setOpenAlert(true);
        } else {
          navigate(`/health-package-subscription/${packageName}`);
        }
      }
    } else if (target === "familyMember" && packageName) {
      window.location.href = `/patient/SubscribeFam?packageName=${packageName}`;
    }

    setHoveredOption(null);
  };

  const handleCloseAlert = (event: React.SyntheticEvent, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleHoverOption = (option: string) => {
    setHoveredOption(option);
  };

  // const boxColors = ["#ffc107", "#bdbdbd", "#4caf50", "#ff9800"];


  return (
    <Card
      sx={{
        maxWidth: 345,
        m: 2,
        boxShadow: 3,
        minHeight: 280,
        "&:hover": {
          boxShadow: 5,
          borderColor: "blue",
        },
        // backgroundColor: boxColors[healthPackage.name.length % boxColors.length], // Set background color based on the length of the package name
      }}
      onMouseLeave={() => {
        setAnchorEl(null);
        setHoveredOption(null);
      }}
    >
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        border: `2px solid transparent`,
        "&:hover": {
          border: `2px solid blue`,
        },
      }}
    >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {healthPackage.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          ${healthPackage.feesPerYear} / year
        </Typography>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Typography variant="body2" color="text.secondary">
            Appointmnet Discount: <b>{healthPackage.doctorDiscount}%</b>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
            Medicine Discount: <b>{healthPackage.medicineDiscount}%</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Family Subscription Discount:{" "}
            <b>{healthPackage.familysubscribtionDiscount}%</b>
          </Typography>
          </Box>
          <Button
          variant="contained"
          onMouseEnter={handleOpenMenu}
          sx={{ mt: 2 }}
        >
          Subscribe
        </Button>
        {/* ... (existing snackbar component) */}
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            severity="warning"
            sx={{ width: "100%", fontSize: "1.5rem" }}
          >
            Package Already Subscribed
          </MuiAlert>
        </Snackbar>
        <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => handleCloseMenu("", "")}
  onMouseLeave={() => {
    setAnchorEl(null);
    setHoveredOption(null);
    handleCloseMenu("","")
  }}
>
          <MenuItem
            onClick={() => handleCloseMenu("myself", healthPackage.name)}
            onMouseOver={() => handleHoverOption("myself")}
            sx={{
              backgroundColor:
                hoveredOption === "myself" ? "#e0e0e0" : "inherit",
            }}
          >
            For Myself
          </MenuItem>
          <MenuItem
            onClick={() => handleCloseMenu("familyMember", healthPackage.name)}
            onMouseOver={() => handleHoverOption("familyMember")}
            sx={{
              backgroundColor:
                hoveredOption === "familyMember" ? "#e0e0e0" : "inherit",
            }}
          >
            For a Family Member
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default HealthPackageComp;