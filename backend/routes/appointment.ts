import express from "express";
import { createAppointment, getAllAppointments, getAppointments, getPapp } from "../controllers/appointmentController";



const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAppointments);
router.get("/getAll", getAllAppointments);
router.get("/appP",getPapp);
export default router;