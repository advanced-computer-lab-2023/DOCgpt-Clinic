// PatientPrescriptions.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PrescriptionCard from "../../components/prescription"; // Adjust the import path
import PatientAppBar from "../../components/patientBar/patientBar";
import { Grid, Typography } from "@mui/material";
import logo from "../../logo.jpeg";
import El7a2niPatientInfo from "../../components/El7a2niPatient-info";
import Background from '../../Prescriptions.jpeg';
import Back from "../../components/backButton";

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
      <div
      style={{
        position: 'relative',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '50vh',
        marginBottom: '100px',
        backgroundPosition: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>

      <Back />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1>
          <strong>MY PRESCRIPTIONS</strong>
        </h1>
      </div>
    </div>
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
      <El7a2niPatientInfo />
    </>
  );
};

export default PatientPrescriptions;
