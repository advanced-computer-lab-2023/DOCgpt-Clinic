// PatientPrescriptions.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PrescriptionCard from "../../components/prescription"; // Adjust the import path
import PatientAppBar from "../../components/patientBar/patientBar";
import { Grid, Typography } from "@mui/material";
import logo from "../../logo.jpeg";
import El7a2niInfo from "../../components/El7a2ni-info";

interface Medicine {
  medicineName: string;
  dosage: string;
  quantity: number;
  _id: string;
}
interface Prescription {
  doctorName: string;
  date: string;
  status: string;
  medicines: Medicine[];
  _id: string;
}
const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/getAllPrescriptionsPatient", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your authentication token
          },
        });
        console.log(response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <PatientAppBar />
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ textAlign: "center" }}
        padding={5}
      >
        MY PRESCRIPTIONS
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <Grid item key={index}>
              <PrescriptionCard prescription={prescription} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            style={{ textAlign: "center", margin: "20px" }}
          >
            You currently have no prescriptions.
          </Typography>
        )}
      </Grid>
      <El7a2niInfo />
    </>
  );
};

export default PatientPrescriptions;
