import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminBar from "../../components/admin Bar/adminBar";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();


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
      setDoctors((prevDoctors) =>
        prevDoctors.filter(
          (doctor) => doctor.username !== doctorUsername
        )
      );

      // Implement additional logic if needed (e.g., updating state)
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
      setDoctors((prevDoctors) =>
        prevDoctors.filter(
          (doctor) => doctor.username !== doctorUsername
        )
      );
      // Implement additional logic if needed (e.g., updating state)
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      // Implement error handling as needed
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/routes/doctors/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter doctors with status 'pending'
        const pendingDoctors = response.data.filter(
          (doctor: Doctor) => doctor.status === "pending"
        );
        setDoctors(pendingDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <AdminBar />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Pending Doctors
        </Typography>
        <List>
          {doctors.map((doctor) => (
            <React.Fragment key={doctor._id}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={doctor.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        ID: {doctor._id}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Username: {doctor.username}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Email: {doctor.email}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Hourly Rate: {doctor.hourlyRate}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Affiliation: {doctor.affiliation}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        Educational Background:{" "}
                        {doctor.educationalBackground}
                      </Typography>
                      <br />
                      <Link
                      to={`/view-doctor-documents/${doctor.username}`}
                      onClick={() => navigate(`/view-doctor-documents/${doctor.username}`, { state: { doctorUsername: doctor.username } })}
                    >
                      View Uploaded Documents
                    </Link>                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(doctor.username)}
                  style={{ marginRight: 8 }}
                >
                  Accept
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleReject(doctor.username)}
                >
                  Reject
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </>
  );
};

export default DoctorRequests;