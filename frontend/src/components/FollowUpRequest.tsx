import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { useState } from "react";

interface RequestProps {
  request: any;
}

const FollowUpRequest = ({ request }: RequestProps) => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "accept" or "reject"
  if (!request) {
    return null; // Or render an empty state or error message
  }
  const {
    Appointmentstatus,
    patient,
    AppointmentDate,
    type,
    price,
    paid,
    followUpDate,
    _id,
    status,
    requestedBy,
  } = request;

  const isPaid = paid ? "Yes " : "No ";

  const oldAppointmentDate = new Date(AppointmentDate).toISOString();

  const requestedfollowUpDate = new Date(followUpDate).toISOString();

  const handleAccept = () => {
    //call accept doctors backend
    setActionType("accept");
    setConfirmationDialogOpen(true);
  };
  const acceptRequest = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "/routes/doctors/acceptFollowUpRequest",
        {
          requestId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching timeslots:", error);
    }
  };

  const handleReject = () => {
    //call reject doctor backend
    setActionType("reject");
    setConfirmationDialogOpen(true);
  };
  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
    window.location.reload();
  };

  const handleConfirmation = async () => {
    setConfirmationDialogOpen(false);
    window.location.reload();

    if (actionType === "accept") {
      // Call accept doctors backend
      await acceptRequest();
    } else if (actionType === "reject") {
      // Call reject doctor backend
      await rejectRequest();
    }
  };

  const rejectRequest = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "/routes/doctors/rejectFollowUpRequest",
        {
          requestId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching timeslots:", error);
    }
  };
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
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ padding: "20px", margin: "10px", height: "auto" }}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="h5" textAlign={"center"} gutterBottom>
                <strong>
                  <span style={{ color: "#2196F3" }}>{requestedBy}</span>
                </strong>{" "}
                {status === "pending" ? "is requesting" : "requested"} a follow
                up
              </Typography>

              <div style={styles.space}></div>

              <Typography variant="body1">
                <strong> On: </strong>{" "}
                {` ${new Date(requestedfollowUpDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {new Date(requestedfollowUpDate).getHours() === 14
                    ? new Date(requestedfollowUpDate).getHours() - 2
                    : new Date(requestedfollowUpDate).getHours() === 13
                    ? new Date(requestedfollowUpDate).getHours() - 2
                    : new Date(requestedfollowUpDate).getHours() > 12
                    ? new Date(requestedfollowUpDate).getHours() - 14
                    : new Date(requestedfollowUpDate).getHours() === 0
                    ? new Date(requestedfollowUpDate).getHours() + 10
                    : new Date(requestedfollowUpDate).getHours() === 1
                    ? new Date(requestedfollowUpDate).getHours() + 10
                    : new Date(requestedfollowUpDate).getHours() === 2
                    ? new Date(requestedfollowUpDate).getHours() + 10
                    : new Date(requestedfollowUpDate).getHours() - 2}
                  {":"}
                  {new Date(requestedfollowUpDate).getMinutes() < 10
                    ? new Date(requestedfollowUpDate)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")
                    : new Date(requestedfollowUpDate).getMinutes()}{" "}
                  {new Date(requestedfollowUpDate).getHours() === 0
                    ? "PM"
                    : new Date(requestedfollowUpDate).getHours() === 1
                    ? "PM"
                    : new Date(requestedfollowUpDate).getHours() >= 14
                    ? "PM"
                    : "AM"}
                </span>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status: </strong> {status}
              </Typography>
              <div style={styles.space}></div>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                {" "}
                <strong> For an old appointment</strong>
              </Typography>
              <div style={styles.space}></div>

              <Typography variant="body1" color="text.secondary">
                {" "}
                <strong> was on: </strong>
                {` ${new Date(oldAppointmentDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {new Date(oldAppointmentDate).getHours() === 14
                    ? new Date(oldAppointmentDate).getHours() - 2
                    : new Date(oldAppointmentDate).getHours() === 13
                    ? new Date(oldAppointmentDate).getHours() - 2
                    : new Date(oldAppointmentDate).getHours() > 12
                    ? new Date(oldAppointmentDate).getHours() - 14
                    : new Date(oldAppointmentDate).getHours() === 0
                    ? new Date(oldAppointmentDate).getHours() + 10
                    : new Date(oldAppointmentDate).getHours() === 1
                    ? new Date(oldAppointmentDate).getHours() + 10
                    : new Date(oldAppointmentDate).getHours() === 2
                    ? new Date(oldAppointmentDate).getHours() + 10
                    : new Date(oldAppointmentDate).getHours() - 2}
                  {":"}
                  {new Date(oldAppointmentDate).getMinutes() < 10
                    ? new Date(oldAppointmentDate)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")
                    : new Date(oldAppointmentDate).getMinutes()}{" "}
                  {new Date(oldAppointmentDate).getHours() === 0
                    ? "PM"
                    : new Date(oldAppointmentDate).getHours() === 1
                    ? "PM"
                    : new Date(oldAppointmentDate).getHours() >= 14
                    ? "PM"
                    : "AM"}
                </span>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {" "}
                <strong> with: </strong>
                {patient}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <strong>Status:</strong> {Appointmentstatus}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginBottom: "40px",
                marginRight: "40px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={handleAccept}
                style={{
                  color:
                    status === "pending" ? "rgba(0, 150, 136, 0.7)" : "grey",
                  marginRight: "10px",
                  fontSize: "3rem",
                }}
                disabled={status !== "pending"}
              >
                <CheckIcon style={{ fontSize: "2rem" }} />
              </IconButton>

              <IconButton
                onClick={handleReject}
                style={{
                  color: status === "pending" ? "red" : "grey",
                  marginRight: "10px",
                  fontSize: "3rem",
                }}
                disabled={status !== "pending"}
              >
                <CloseIcon style={{ fontSize: "2rem" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </div>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      >
        <DialogTitle>{`Confirm ${
          actionType === "accept" ? "Accept" : "Reject"
        } Request`}</DialogTitle>
        <DialogContent>
          <Typography>
            {`Are you sure you want to ${
              actionType === "accept" ? "accept" : "reject"
            } this follow-up request?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
          <Button onClick={handleConfirmationDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
const styles: { [key: string]: CSSProperties } = {
  space: {
    height: 20,
  },
};

export default FollowUpRequest;
