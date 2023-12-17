import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
// Replace these with your actual icons
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import DiscountIcon from "@mui/icons-material/Discount";
import DateRangeIcon from "@mui/icons-material/DateRange";
const services = [
  {
    title: "Health Packages",
    description:
      "There is a group of health packages that you can subscribe to that offers you alot of discount.",
    Icon: DiscountIcon,
    path: "/patient/healthPackages",
  },
  {
    title: "Doctors",
    description:
      "There is a great number of proffesional doctors that you can reserve appointments with.",
    Icon: DateRangeIcon,
    path: "/patient/viewDoctors",
  },
  {
    title: "Family members",
    description:
      "We allow you to link with your family members and reserve appointments for them.",
    Icon: Diversity1Icon,
    path: "/patient/link",
  },
];

const ServiceCard = styled(Card)(({ theme }) => ({
  flex: "1 0 30%",
  maxWidth: 345, // Increase this value to make the card wider
  height: "auto", // Change this to a fixed value or 'auto' to adjust the height
  textAlign: "center",
  margin: theme.spacing(2),
  padding: theme.spacing(5),
  boxSizing: "border-box",
}));

const ServiceIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: theme.spacing(8),
  width: theme.spacing(8),
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",
  margin: "0 auto",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ServicesSection = () => {
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
    <Box sx={{ maxWidth: "100%", m: "auto" }}>
      <Typography
        variant="h1"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mt: 4 }}
      >
        What we offer
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <CardContent>
              <ServiceIcon>
                <service.Icon style={{ fontSize: "2rem", color: "white" }} />
              </ServiceIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                {service.title}
              </Typography>
              <Typography color="textSecondary">
                {service.description}
              </Typography>
            </CardContent>
            <Link to={service.path} style={{ textDecoration: "none" }}>
              <Button size="small" color="primary">
                Check this
              </Button>
            </Link>
          </ServiceCard>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
