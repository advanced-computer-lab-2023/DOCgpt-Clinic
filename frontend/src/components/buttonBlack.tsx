import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // You can customize this logic based on your routing needs
    navigate(-1); // Go back one step in the history
  };

  return (
    <Button onClick={handleBack} startIcon={<ArrowBackIcon />} style={{marginLeft:"20px", marginTop:"10px", color:"black"}}>
      Back
    </Button>
  );
};

export default BackButton;
