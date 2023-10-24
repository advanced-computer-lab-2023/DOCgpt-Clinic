import express from "express";
import { addTimeSlots, createDoctors, getAppointmentByDate, getAppointmentByStatus, getDoctor, getDoctors, searchPatient, selectPatient, updateDoctorAffiliation, updateDoctorEmail, updateDoctorHourlyRate, viewHealthRecord, viewHealthRecords, viewMyPatients, viewPatientsUpcoming,createfollowUp, uploadAndSubmitReqDocs} from "../controllers/doctorController";
import multer from "multer";
import path from 'path';

const router = express.Router();

router.get("/", getDoctors);
router.get("/getDoctor", getDoctor);
router.get("/searchPatient", searchPatient);
router.get("/viewMyPatients", viewMyPatients);
router.get("/selectPatient", selectPatient);
router.get("/viewPatientsUpcoming", viewPatientsUpcoming );
router.get("/appointmentsByDate", getAppointmentByDate);
router.get("/appointmentsByStatus", getAppointmentByStatus);
router.get("/HealthRecords", viewHealthRecords);
router.get("/HealthRecord", viewHealthRecord);

router.post("/postDoctor", createDoctors);
  

router.patch("/updateEmail", updateDoctorEmail);
router.patch("/updateRate", updateDoctorHourlyRate);
router.patch("/updateAffiliation", updateDoctorAffiliation);



//create follow up
router.post("/followup",createfollowUp);

export default router;