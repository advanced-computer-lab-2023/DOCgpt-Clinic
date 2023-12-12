import {
Button,
Card,
CardContent,
Container,
Grid,
Paper,
Typography,
Dialog,
DialogContent,
DialogTitle,
DialogActions,
CircularProgress,
List,
ListItem,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";

interface Doctor {
username: string;
name: string;
email: string;
hourlyRate: number;
speciality: string;
timeslots: [{ date: Date }];
educationalBackground: string;
}
interface Timeslot {
date: Date;
// Add other properties as needed
}
function DoctorInfo() {
//THE LOGIC OF GETTING A CERTAIN PATIENTS INFO UPON CLICK
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const price = queryParams.get("price");
const [doctor, setDoctor] = useState<Doctor | null>(null);
const selectedDoctor = localStorage.getItem("selectedDoctor");
const navigate = useNavigate();
const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot>();
const [open, setOpen] = useState(true);

const fetchDoctor = async () => {
    console.log("Fetching Doctor...");
    try {
    const response = await axios.get(
        `/routes/patient/doctors/select?username=${selectedDoctor}`
    );
    console.log("Response:", response);
    setDoctor(response.data);
    } catch (error) {
    console.error("Error:", error);
    }
};

useEffect(() => {
    fetchDoctor();
}, []);
const handleTimeslotSelect = (selectedTimeslot: Timeslot) => {
    // Handle the selected timeslot as needed
    setSelectedTimeslot(selectedTimeslot);
};

const ReserveAppointmentForMe = () => {
    //fel page de hangeb el doctor username mn local storage w neb3ato lel back f body w session price f body, w el token fel header
    //set doctorUsername fel local storage
    if (doctor && selectedTimeslot) {
    localStorage.setItem("doctorUserName", doctor.username);
    navigate(`/makeApp/${selectedTimeslot.date}/${price}`);
    }
};
const ReserveAppointmentForFam = () => {
    if (doctor && selectedTimeslot) {
    //fel page de hangeb el doctor username mn local storage w neb3ato lel back f body w session price f body, w el token fel header
    localStorage.setItem("doctorUserName", doctor.username);
    navigate(`/patient/ViewMyFam/${selectedTimeslot.date}/${price}`);
    }
};
const handleClose = () => {
    setOpen(false);
    navigate("/patient/viewDoctors");
};
//return
//THE DISPLAY OF THAT INFO
//JUST A LITTLE CARD IN THE MIDDLE OF THE PAGE CONTAINS ALL INFO OF THE PATIENT
return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
    <DialogTitle>
        <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{ textAlign: "center" }}
        >
        Information Of Selected Doctor
        </Typography>
    </DialogTitle>
    <DialogContent>
        {doctor && (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography>
                <span style={{ fontWeight: "bold" }}>Name:</span> {doctor.name}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {doctor.email}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>
                <span style={{ fontWeight: "bold" }}>Hourly Rate:</span>{" "}
                {doctor.hourlyRate}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>
                <span style={{ fontWeight: "bold" }}>Speciality:</span>{" "}
                {doctor.speciality}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography>
                <span style={{ fontWeight: "bold" }}>
                Educational Background:
                </span>{" "}
                {doctor.educationalBackground}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {" "}
                Pick A Date:
            </Typography>
            <List>
                {doctor.timeslots.map((timeslot, index) => (
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
                    {` ${new Date(timeslot.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}, ${new Date(timeslot.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}
                    </Typography>
                </ListItem>
                ))}
            </List>
            </Grid>

            {/* Add more patient information fields here */}
        </Grid>
        )}
        {selectedTimeslot && (
        <Paper
            elevation={3}
            style={{ padding: "16px", marginBottom: "16px" }}
        >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Selected Timeslot
            </Typography>
            <Typography variant="body1">
            {` ${new Date(selectedTimeslot.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}, ${new Date(selectedTimeslot.date).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}`}
            {/* Add other details of the selected timeslot as needed */}
            </Typography>
        </Paper>
        )}
        <DialogActions>
        <Button
            variant="outlined"
            color="secondary"
            onClick={ReserveAppointmentForMe}
            startIcon={<PersonSharpIcon />}
            disabled={!selectedTimeslot} // Disable the button if no timeslot is selected
        >
            Reserve For Me
        </Button>
        <Button
            variant="outlined"
            color="primary"
            onClick={ReserveAppointmentForFam}
            startIcon={<PeopleAltSharpIcon />}
            disabled={!selectedTimeslot} // Disable the button if no timeslot is selected
        >
            Reserve For A Fam Mem
        </Button>
        </DialogActions>
    </DialogContent>
    </Dialog>
);
}

export default DoctorInfo;
