import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Paper } from "@mui/material";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PersonIcon from "@mui/icons-material/Person";
import AdminBar from "../../components/admin Bar/adminBar";
import { Link, useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import MuiAlert from "@mui/material/Alert";
import El7a2niAdminInfo from "../El7a2niAdmin-info";
import Background from "../../doctorss.jpeg";
import Back from "../backButton";

interface Doctor {
  _id: string;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
  status: string;
}

const DoctorRequests: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [acceptedDoctors, setAcceptedDoctors] = useState<string[]>([]);
  const [rejectedDoctors, setRejectedDoctors] = useState<string[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedDoctorToDelete, setSelectedDoctorToDelete] = useState<
    string | null
  >(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleAccept = async (doctorUsername: string) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(`Accepting doctor with username: ${doctorUsername}`);

      // Call the acceptDoctorRequest API endpoint
      const response = await axios.patch(
        "/routes/doctors/acceptRequest",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { doctorUsername },
        }
      );

      console.log("Doctor accepted successfully:", response.data);

      // Show the success Snackbar
      setOpenAlert(true);

      // Remove the doctor from the list
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== doctorUsername)
      );
      setSnackbarMessage("Doctor accepted successfully");
      setSnackbarSeverity("success");
      setOpenAlert(true);
    } catch (error) {
      console.error("Error accepting doctor:", error);
      // Implement error handling as needed
    }
  };

  const handleReject = async (doctorUsername: string) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(`Rejecting doctor with username: ${doctorUsername}`);

      // Call the rejectDoctorRequest API endpoint
      const response = await axios.patch(
        "/routes/doctors/rejectRequest",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { doctorUsername },
        }
      );

      console.log("Doctor rejected successfully:", response.data);

      // Show the success Snackbar
      setOpenAlert(true);

      // Remove the doctor from the list
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== doctorUsername)
      );
      setSnackbarMessage("Doctor deleted successfully");
      setSnackbarSeverity("error");
      setOpenAlert(true);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      // Implement error handling as needed
    }
  };

  const isDoctorAccepted = (doctorUsername: string) => {
    return acceptedDoctors.includes(doctorUsername);
  };
  const headerCellStyle = {
    backgroundColor: "rgba(173, 216, 230, 0.4)", // Very light blue
  };
  const isDoctorRejected = (doctorUsername: string) => {
    return rejectedDoctors.includes(doctorUsername);
  };
  const openDeleteConfirmation = (doctorUsername: string) => {
    setSelectedDoctorToDelete(doctorUsername);
    setDeleteConfirmationOpen(true);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/hhi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching accepted doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <AdminBar />
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
            <strong>PENDING DOCTORS</strong>
          </h1>
        </div>
      </div>
      <Container maxWidth="lg">
        <Paper style={{ maxHeight: "600px", overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={headerCellStyle}>#</TableCell>
                <TableCell style={headerCellStyle}>Username</TableCell>
                <TableCell style={headerCellStyle} align="left">
                  Hourly Rate
                </TableCell>
                <TableCell style={headerCellStyle} align="left">
                  Affiliation
                </TableCell>
                <TableCell style={headerCellStyle} align="left">
                  Background
                </TableCell>
                <TableCell style={headerCellStyle} align="left">
                  Email
                </TableCell>
                <TableCell style={headerCellStyle} align="center">
                  Accept/Reject
                </TableCell>
                <TableCell style={headerCellStyle} align="center">
                  Documents
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow key={doctor._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{doctor.username}</TableCell>
                  <TableCell align="left">{doctor.hourlyRate}</TableCell>
                  <TableCell align="left">{doctor.affiliation}</TableCell>
                  <TableCell align="left">
                    {doctor.educationalBackground}
                  </TableCell>
                  <TableCell align="left">{doctor.email}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleAccept(doctor.username)}
                    >
                      <DoneIcon style={{ color: "green" }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => openDeleteConfirmation(doctor.username)}
                    >
                      <ClearIcon style={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" color="#2196f3">
                    <Link
                      to={`/view-doctor-documents/${doctor.username}`}
                      className="link-hover-effect"
                    >
                      View Uploaded Documents
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
          >
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this doctor?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  if (selectedDoctorToDelete !== null) {
                    handleReject(selectedDoctorToDelete);
                  }
                  setDeleteConfirmationOpen(false);
                }}
              >
                Yes
              </Button>
              <Button onClick={() => setDeleteConfirmationOpen(false)}>
                No
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={openAlert}
            autoHideDuration={2000}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MuiAlert
              severity={snackbarSeverity}
              sx={{ width: "100%", height: "50%", fontSize: "1.5rem" }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </Paper>
      </Container>
      <El7a2niAdminInfo />
    </>
  );
};

export default DoctorRequests;
