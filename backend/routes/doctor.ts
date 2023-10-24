import express from "express";
import { createDoctors, getAppointmentByDate, getAppointmentByStatus, getDoctor, getDoctors, searchPatient, selectPatient, updateDoctorAffiliation, updateDoctorEmail, updateDoctorHourlyRate, viewHealthRecord, viewHealthRecords, viewMyPatients, viewPatientsUpcoming, uploadAndSubmitReqDocs} from "../controllers/doctorController";
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













































// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/Users/rawan/Desktop/uploads'); // The folder where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
    },
  });
  const upload = multer({ storage });
  
  // Create a route for uploading and submitting required documents
  router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);


export default router;