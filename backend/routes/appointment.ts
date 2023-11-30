import express from "express";
import { createAppointment, getAllAppointments, getAppointments, getPapp , complete, paymenttt, payment2 } from "../controllers/appointmentController";



const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAppointments);
router.get("/getAll", getAllAppointments);
router.get("/appP",getPapp);
router.patch("/completed", complete);

router.post("/makeApp",paymenttt)
router.post("/makeAppForFam",payment2)

export default router;