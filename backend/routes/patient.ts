import express from "express";
import { getAppointmentByDate, getAppointmentByStatus } from "../controllers/patientController";

const router = express.Router();

router.get("/appointmentsByDate", getAppointmentByDate);
router.get("/appointmentsByStatus", getAppointmentByStatus);

export default router;