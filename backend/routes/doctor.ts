import express from "express";
import { addHealthRecord, createDoctors, getAppointmentByDate, getAppointmentByStatus, getDoctor, getDoctors, searchPatient, selectPatient, updateDoctorAffiliation, updateDoctorEmail, updateDoctorHourlyRate, viewHealthRecord, viewHealthRecords, viewMyAppointments, viewMyPatients, viewPastAppointments, viewPatientsUpcoming, viewUpcomingAppointments } from "../controllers/doctorController";

const router = express.Router();

router.get("/", getDoctors);
router.get("/getDoctor", getDoctor);
router.get("/searchPatient", searchPatient);
router.get("/viewMyPatients", viewMyPatients);
router.get("/selectPatient", selectPatient);
router.get("/viewPatientsUpcoming", viewPatientsUpcoming );

//APPOINTMENTS 
router.get("/allMyApp", viewMyAppointments);
router.get("/upcomingApp", viewUpcomingAppointments);
router.get("/pastApp", viewPastAppointments);
router.get("/appointmentsByDate", getAppointmentByDate);
router.get("/appointmentsByStatus", getAppointmentByStatus);

//HEALTH RECORDS
router.get("/HealthRecords", viewHealthRecords);
router.get("/HealthRecord", viewHealthRecord);

router.post("/addHealthRecord", addHealthRecord);

router.post("/postDoctor", createDoctors);

router.patch("/updateEmail", updateDoctorEmail);
router.patch("/updateRate", updateDoctorHourlyRate);
router.patch("/updateAffiliation", updateDoctorAffiliation);




export default router;