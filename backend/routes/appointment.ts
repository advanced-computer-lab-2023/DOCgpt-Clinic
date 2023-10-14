import express from "express";
import { createAppointment, getAllAppointments, getAppointments } from "../controllers/appointmentController";



const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/getAll", getAllAppointments);

export default router;