// FamilyMemberPackageStatus.js or FamilyMemberPackageStatus.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PatientBar from "./patientBar/patientBar";
import Background from "../FamilyMembers.jpg";
import Back from "./backButton";
import El7a2niInfo from "./El7a2ni-info";
const headerCellStyle = {
  backgroundColor: "rgba(173, 216, 230, 0.4)", // Very light blue
};
interface HealthPackageStatus {
  name: string;
  status: string;
  patientName?: string;
  familyMemberName?: string;
  startDate: string;
  endDate: string;
}

const FamilyMemberPackageStatus = () => {
  const [healthPackages, setHealthPackages] = useState<HealthPackageStatus[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/viewHealthPackageStatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHealthPackages(response.data.healthPackages);
      } catch (error) {
        console.error("Error fetching health package status:", error);
      }
    };
    fetchData();
  }, []);

  // Filter out packages for the patient and family members
  const patientPackages = healthPackages.filter((pkg) => !pkg.familyMemberName);
  const familyMemberPackages = healthPackages.filter(
    (pkg) => pkg.familyMemberName
  );

  return (
    <>
      <PatientBar />
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          minHeight: "50vh",
          marginBottom: "100px",
          backgroundPosition: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Transparent overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <Back />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1>
            <strong>FAMILY MEMBERS PACKAGE HISTORY</strong>
          </h1>
        </div>
      </div>

      <Container maxWidth="lg">
        <TableContainer component={Paper} sx={{ marginBottom: "24px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerCellStyle}>
                  Family Member Name
                </TableCell>
                <TableCell style={headerCellStyle}>
                  Health Package Name
                </TableCell>
                <TableCell style={headerCellStyle}>Status</TableCell>
                <TableCell style={headerCellStyle}>Start Date</TableCell>
                <TableCell style={headerCellStyle}>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {familyMemberPackages.map((pkg, index) => (
                <TableRow key={index}>
                  <TableCell>{pkg.familyMemberName}</TableCell>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.status}</TableCell>
                  <TableCell>{pkg.startDate}</TableCell>
                  <TableCell>{pkg.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <El7a2niInfo />
    </>
  );
};

export default FamilyMemberPackageStatus;
