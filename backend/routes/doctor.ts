import express from "express";
import { addTimeSlots, createDoctors, getAppointmentByDate, getAppointmentByStatus, getDoctor, getDoctors, 
  searchPatient, selectPatient, updateDoctorAffiliation, 
  updateDoctorEmail, updateDoctorHourlyRate, viewHealthRecord,
   viewHealthRecords, viewMyPatients, viewPatientsUpcoming,createfollowUp, 
   uploadAndSubmitReqDocs, viewMyAppointments, viewPastAppointments, viewUpcomingAppointments,logout,changePassword, addHealthRecord, getPendingDoctor, acceptDoctorRequest, rejecttDoctorRequest, removeTimeSlots, calculateSessionPrice, ViewMyTimeSlots, commentsHealthRecord, verifyTokenDoctor, viewWalletAmount, serveDoctorDocument, getDoctorDocuments, rescheduleAppointments, getTodayAppointments,acceptFollowUpRequest,rejectFollowUpRequest,addOrUpdateDosage,updateUnfilledPrescription} from "../controllers/doctorController";
 
import multer from "multer";
import path from 'path';
import fs from "fs";
import documentModel from "../models/documentModel";
import doctorModel from "../models/doctorModel";

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
router.get("/todayapp",getTodayAppointments);

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

  router.delete('/logoutDoctor',logout)
  router.post('/changePassDoc',changePassword)


  //requests approval 
router.get("/pendingDoctors",getPendingDoctor);
router.patch("/acceptRequest",acceptDoctorRequest);
router.patch("/rejectRequest",rejecttDoctorRequest);




// Define the path to the folder where uploaded documents are stored
const uploadFolder = path.join(__dirname, 'uploads');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Use the original name provided by the user (assuming it is unique)
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Create a route for uploading and submitting required documents

// router.post('/upload', upload.single('file'), (req, res) => {
//   if (req.file && req.body.username) {
//     const { originalname, filename } = req.file;
//     const filePath = path.join('uploads', filename);

//     documentModel.create({ username: req.body.username, document: filename, filePath })
//       .then((result: any) => res.json(result))
//       .catch((err: any) => res.status(500).json({ error: 'Failed to store in the database' }));
//   } else {
//     res.status(400).json({ error: 'File or username not provided' });
//   }
// });

router.post('/upload', upload.array('file', 5), async (req, res) => {
  try {
    const uploadedFiles = req.files as Express.Multer.File[];

    if (uploadedFiles && req.body.username) {
      // Process each uploaded file
      const promises = uploadedFiles.map(async (file) => {
        const { originalname, filename } = file;
        const filePath = path.join('uploads', filename);

        // Save document to documentModel
        const documentResult = await documentModel.create({
          username: req.body.username,
          document: filename,
          filePath,
        });

        // Update doctor's documents array
        const doctor = await doctorModel.findOneAndUpdate(
          { username: req.body.username },
          { $push: { documents: { filename, path: filePath } } },
          { new: true }
        );

        return { document: documentResult, doctor };
      });

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      res.json(results);
    } else {
      res.status(400).json({ error: 'Files or username not provided' });
    }
  } catch (error) {
    console.error('Error in /upload request:', error);
    res.status(500).json({ error: 'Failed to store in the database' });
  }
});





//router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);

// // Add a route to get the list of uploaded documents
// router.get('/doctorDocuments', getDoctorDocuments);


// // // Add a route to serve the actual document file
//  router.get('/doctorDocuments/:filename', serveDoctorDocument);

/// Endpoint to get a doctor's documents by username
router.post("/getDoctorDocuments", async (req, res) => {
  try {
    const { username } = req.body;

    // Fetch documents based on the doctor's username
    const documents = await documentModel.find({ username });

    // Map the documents to include doctorUsername in the response
    const responseDocuments = documents.map(doc => ({
      doctorUsername: doc.username,
      document: doc.document,
      filePath: doc.filePath
    }));

    res.status(200).json(responseDocuments);
  } catch (error) {
    console.error("Error fetching doctor's documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to download a document
router.post('/downloadDocument', async (req, res) => {
  try {
    const { document } = req.body;

    // Construct the full path to the document
    const documentPath = path.join(uploadFolder, document);

    // Check if the file exists
    if (fs.existsSync(documentPath)) {
      // Read the file and send it in the response
      const fileStream = fs.createReadStream(documentPath);
      fileStream.pipe(res);
    } else {
      // If the file doesn't exist, send a 404 response
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/rescheduleApp',rescheduleAppointments);
router.patch('/acceptFollowUpRequest', acceptFollowUpRequest);
router.patch('/rejectFollowUpRequest', rejectFollowUpRequest);


//sprint 3
router.post('/addOrUpdateDosage', addOrUpdateDosage);
router.patch('/updateUnfilledPrescription',updateUnfilledPrescription);

export default router;
