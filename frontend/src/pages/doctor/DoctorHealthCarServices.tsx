import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MedicationIcon from "@mui/icons-material/Medication";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import Groups2Icon from "@mui/icons-material/Groups2";
const services = [
  {
    title: "Add New Time slots",
    icon: <MoreTimeIcon />,
    path: "/doctor/time",
  },
  {
    title: "View All your patients",
    icon: <Groups2Icon />,
    path: "/doctor/patients",
  },
  {
    title: "View follow up requests",
    icon: <RequestPageIcon />,
    path: "/doctor/followUpRequests",
  },
];
interface ServiceProps {
  title: string; // Define the expected type for title
  icon: JSX.Element; // Define the expected type for icon (React component)
}

const ServiceCard: React.FC<ServiceProps & { path: string }> = ({
  title,
  icon,
  path,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <Card
      sx={{
        textAlign: "center",
        maxWidth: 250,
        maxHeight: 250,
        margin: "auto",
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
        {" "}
        {/* Ensure it fills the card */}
        <Box sx={{ paddingTop: 6, textAlign: "center" }}>{icon}</Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const HealthcareServices = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography
        variant="h1"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center", marginTop: "30px" }}
      >
        Share in the best health care services
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1, // Adjust the gap between the cards as needed
        }}
      >
        {services.map((service, index) => (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={4}
            key={index}
          >
            <ServiceCard
              title={service.title}
              icon={service.icon}
              path={service.path}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HealthcareServices;
