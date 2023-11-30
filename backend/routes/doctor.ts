import express from "express";
import { addTimeSlots, createDoctors, getAppointmentByDate, getAppointmentByStatus, getDoctor, getDoctors, 
  searchPatient, selectPatient, updateDoctorAffiliation, 
  updateDoctorEmail, updateDoctorHourlyRate, viewHealthRecord,
   viewHealthRecords, viewMyPatients, viewPatientsUpcoming,createfollowUp, 
   uploadAndSubmitReqDocs, viewMyAppointments, viewPastAppointments, viewUpcomingAppointments,logout,changePassword, addHealthRecord, getPendingDoctor, acceptDoctorRequest, rejecttDoctorRequest, removeTimeSlots, calculateSessionPrice, ViewMyTimeSlots, commentsHealthRecord, verifyTokenDoctor, viewWalletAmount, serveDoctorDocument, getDoctorDocuments, rescheduleAppointments} from "../controllers/doctorController";
import multer from "multer";
import path from 'path';
import fs from "fs"

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
router.patch("/HealthRecord/comments", commentsHealthRecord);


router.post("/postDoctor", createDoctors);
router.post("/addHealthRecord", addHealthRecord);

router.patch("/updateEmail", updateDoctorEmail);
router.patch("/updateRate", updateDoctorHourlyRate);
router.patch("/updateAffiliation", updateDoctorAffiliation);



//create follow up
router.post("/followup",createfollowUp);
router.patch("/addtimeslot",addTimeSlots);
router.get("/getSlots",ViewMyTimeSlots);
router.patch("/removetimeslot",removeTimeSlots);
router.get('/sessionPrice',calculateSessionPrice);


// Create a route for viewing wallet amount
router.get('/viewWalletAmount',verifyTokenDoctor, viewWalletAmount);


// Set up Multer for file uploads

  
  // Create a route for uploading and submitting required documents
  // router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);



  router.delete('/logoutDoctor',logout)
  router.post('/changePassDoc',changePassword)


  //requests approval 
router.get("/pendingDoctors",getPendingDoctor);
router.patch("/acceptRequest",acceptDoctorRequest);
router.patch("/rejectRequest",rejecttDoctorRequest);




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, '../uploads'); // The folder where files will be saved (inside your project)

    // Check if the 'uploads' folder exists, and create it if not
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
  },
});

const upload = multer({ storage });

//Create a route for uploading and submitting required documents

router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);

// Add a route to get the list of uploaded documents
router.get('/doctorDocuments', getDoctorDocuments);


// // Add a route to serve the actual document file
 router.get('/doctorDocuments/:filename', serveDoctorDocument);

// Create a route for uploading and submitting required documents
router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);

router.patch('/rescheduleApp',rescheduleAppointments);

export default router;

