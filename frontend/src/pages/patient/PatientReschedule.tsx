import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import { Alert, AlertTitle } from "@mui/material";
interface Timeslot {
  date: Date;
  // Add other properties as needed
}

const PatientReschedule: React.FC = () => {
  const [open, setOpen] = useState(true);
  const selectedAppointmentId = localStorage.getItem("selectedAppointmentId");
  const oldDate = localStorage.getItem("oldDate");
  const selectedDoctor = localStorage.getItem("selectedDoctor");
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error">(
    "success"
  ); // or 'error' for example
  const [alertMessage, setAlertMessage] = React.useState("");
  const rescheduled = localStorage.getItem("rescheduled");

  useEffect(() => {
    // Fetch doctor data only if selectedDoctor is defined
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `/routes/doctors/getDoctorByUsername?doctorUsername=${selectedDoctor}`
        );
        console.log(response.data.doctor[0]);
        const data = await response.data.doctor[0].timeslots;
        const sortedSlots = data.sort((a: any, b: any) => {
          const dateA = new Date(a.date.toLocaleString("en-US",  "Africa/Cairo" ));
          const dateB = new Date(b.date.toLocaleString("en-US",  "Africa/Cairo" ));
  
          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          // If dates are equal, compare times
          const timeA = dateA.getHours() * 60 + dateA.getMinutes();
          const timeB = dateB.getHours() * 60 + dateB.getMinutes();
          return timeB - timeA;
        });
        setTimeslots(sortedSlots);
        console.log(response.data.doctor[0].timeslots);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, []);

  const handleTimeslotSelect = (selectedTimeslot: Timeslot) => {
    // Handle the selected timeslot as needed
    setSelectedTimeslot(selectedTimeslot);
  };
  const handleCloseAlert = () => {
    setAlertOpen(false);
    window.location.reload();
    localStorage.setItem("rescheduled", "true");
  };

  const submitTimeSlot = async () => {
    try {
      await doReschedule();
      setAlertSeverity("success");
      setAlertMessage("Rescheduling successful!");
      setAlertOpen(true);
      // window.location.reload();
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Error rescheduling appointment.");
      setAlertOpen(true);
      console.error("Error rescheduling appointment:", error);
    }
  };
  const doReschedule = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (selectedTimeslot) {
        const response = await axios.patch(
          "/routes/patient/rescheduleAppointments",
          {
            appointmentId: selectedAppointmentId,
            date: selectedTimeslot.date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching timeslots:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/patient/viewMyappointments");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ zIndex: 1000 }}
      >
        <DialogTitle>
        {(rescheduled==="true")? (
            <Typography
            variant="h2"
                gutterBottom
                color="primary"
                style={{ textAlign: "center", fontWeight: "bold" }}
            >
                Appointment Rescheduled 
          </Typography>
        ): (
            <Typography
                variant="h2"
                gutterBottom
                color="primary"
                style={{ textAlign: "center", fontWeight: "bold" }}
            >
                When would you like to reschedule?
            </Typography>
        )}


          {((rescheduled==="false") && oldDate) && (
            <Typography
              variant="body1"
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Your old appointment was on{" "}
              {` ${new Date(oldDate).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
              {" "}
              <span style={{ fontWeight: "bold" }}>
                          {new Date(oldDate).getHours() === 14
                            ? new Date(oldDate).getHours() - 2
                            : new Date(oldDate).getHours() === 13 
                            ? new Date(oldDate).getHours() - 2
                            : new Date(oldDate).getHours() > 12 
                            ? new Date(oldDate).getHours() - 14
                            : new Date(oldDate).getHours() === 0
                            ? new Date(oldDate).getHours() + 10
                            : new Date(oldDate).getHours() === 1
                            ? new Date(oldDate).getHours() + 10
                            : new Date(oldDate).getHours() === 2
                            ? new Date(oldDate).getHours() + 10
                            : new Date(oldDate).getHours() - 2}
                          {":"}
                          {new Date(oldDate).getMinutes() < 10
                            ? new Date(oldDate)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(oldDate).getMinutes()}{" "}
                          {new Date(oldDate).getHours() === 0? "PM"
                          :new Date(oldDate).getHours() === 1? "PM"
                          :new Date(oldDate).getHours() >= 14 ? "PM" : "AM"}
                        </span>
              {/* Add other details of the selected timeslot as needed */}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
        {(rescheduled === "true")? (
                <Typography
                variant="h3"
                gutterBottom
                style={{ textAlign: "center", fontWeight: "bold" }}
            >
                Dr. {selectedDoctor} Is Now Available at
            </Typography>
            ): (
            <Typography
                variant="h3"
                gutterBottom
                style={{ textAlign: "center", fontWeight: "bold" }}
            >
                Dr. {selectedDoctor} Is Available at
            </Typography>

            )}

          {timeslots.length === 0 ? (
            <Typography variant="body1">No timeslots available</Typography>
          ) : (
            <List>
              {timeslots.map((timeslot, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleTimeslotSelect(timeslot)}
                  style={{ transition: "border-radius 0.3s ease-in-out" }}
                  sx={{
                    "&:hover": {
                      borderRadius: "12px", // Set your desired border-radius value
                    },
                  }}
                >
                  <EventIcon style={{ marginRight: "8px" }} />{" "}
                  {/* Calendar Icon */}
                  <Typography variant="body1">
                    {` ${new Date(timeslot.date).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                          {new Date(timeslot.date).getHours() === 14
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() === 13 
                            ? new Date(timeslot.date).getHours() - 2
                            : new Date(timeslot.date).getHours() > 12 
                            ? new Date(timeslot.date).getHours() - 14
                            : new Date(timeslot.date).getHours() === 0
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 1
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() === 2
                            ? new Date(timeslot.date).getHours() + 10
                            : new Date(timeslot.date).getHours() - 2}
                          {":"}
                          {new Date(timeslot.date).getMinutes() < 10
                            ? new Date(timeslot.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(timeslot.date).getMinutes()}{" "}
                          {new Date(timeslot.date).getHours() === 0? "PM"
                          :new Date(timeslot.date).getHours() === 1? "PM"
                          :new Date(timeslot.date).getHours() >= 14 ? "PM" : "AM"}
                        </span>
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}

          {selectedTimeslot && rescheduled==="false"&& (
            <Paper
              elevation={3}
              style={{ padding: "16px", marginBottom: "16px" }}
            >
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Selected Timeslot
              </Typography>
              <Typography variant="body1">
                {`${new Date(selectedTimeslot.date).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
                {" "}
                <span style={{ fontWeight: "bold" }}>
                          {new Date(selectedTimeslot.date).getHours() === 14
                            ? new Date(selectedTimeslot.date).getHours() - 2
                            : new Date(selectedTimeslot.date).getHours() === 13 
                            ? new Date(selectedTimeslot.date).getHours() - 2
                            : new Date(selectedTimeslot.date).getHours() > 12 
                            ? new Date(selectedTimeslot.date).getHours() - 14
                            : new Date(selectedTimeslot.date).getHours() === 0
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() === 1
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() === 2
                            ? new Date(selectedTimeslot.date).getHours() + 10
                            : new Date(selectedTimeslot.date).getHours() - 2}
                          {":"}
                          {new Date(selectedTimeslot.date).getMinutes() < 10
                            ? new Date(selectedTimeslot.date)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : new Date(selectedTimeslot.date).getMinutes()}{" "}
                          {new Date(selectedTimeslot.date).getHours() === 0? "PM"
                          :new Date(selectedTimeslot.date).getHours() === 1? "PM"
                          :new Date(selectedTimeslot.date).getHours() >= 14 ? "PM" : "AM"}
                        </span>
                {/* Add other details of the selected timeslot as needed */}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", paddingBottom: "20px" }}
        >
          {(rescheduled ==="true")? (
            <Button
            onClick={submitTimeSlot}
            variant="contained"
            color="primary"
            size="large"
            style={{ borderRadius: "25px" }}
            disabled={rescheduled === "true"}
        >
            Rescheduled
        </Button>
        ) : (
            <Button
            onClick={submitTimeSlot}
            variant="contained"
            color="primary"
            size="large"
            style={{ borderRadius: "25px" }}
            disabled={!selectedTimeslot}
        >
            Reschedule
        </Button>
        )}
        </DialogActions>
        {/* Alert component */}
      </Dialog>
      <Dialog open={alertOpen}>
        {alertOpen && (
          <Alert
            severity={alertSeverity}
            onClose={handleCloseAlert}
            sx={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <AlertTitle>
              {alertSeverity === "success" ? "Success" : "Error"}
            </AlertTitle>
            {alertMessage}
          </Alert>
        )}
      </Dialog>
    </div>
  );
};

export default PatientReschedule;
