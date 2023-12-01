import express, { Router } from 'express';
import {
  getPatients,
  createPatient,
  addFamilyMember,
  viewFamilyMembers,
  searchDoctors,
  getDoctor,
  filterDoctors,
  getDoctorDetails,
  selectDoctors,
  getPatientAppointments,
  getPrescriptionsByUser,
  viewHealthPackages,
  viewUpcomingAppointments,
  getAppointmentByDate,
  getAppointmentByStatus,
  viewMyHealthRecord,
  logout,
  changePassword,
  linkFamilyMember,
  viewWalletAmount,
  verifyTokenPatient,
  viewDoctorAppointments,
  openPatientDocument,
  uploadPatintDocs,
  deletePatientDocs,
  getAllPrescriptionsForPatient,
  getPrescriptionDetails
  //viewHealthPackageDetails
} from '../controllers/patientController';
import fs from 'fs';
import path from 'path';

import { viewPastAppointments } from "../controllers/patientController";
import multer from 'multer';


const router: Router = express.Router();

// GET all patients
router.get('/getP', getPatients);

router.put('/addfammember',verifyTokenPatient , addFamilyMember);


 router.get("verifyToken",verifyTokenPatient)
// GET a single patient
// router.get('/:id', getPatient);


router.post('/postP', createPatient);

router.get('/viewFam',verifyTokenPatient, viewFamilyMembers);

router.get('/getPatientprescriptions',getPrescriptionsByUser);

router.get('/doctors', getDoctor);



router.get('/doctors/search', searchDoctors);

router.get('/doctors/filter', filterDoctors);


router.get('/doctors/view', getDoctorDetails);

router.get('/doctors/select', selectDoctors);


//APPOINTMENTS 
router.get('/getMyAppointments',getPatientAppointments);
router.get("/pastApp", viewPastAppointments);
router.get("/upcomingApp", viewUpcomingAppointments);
router.get("/getAppByDate", getAppointmentByDate);
router.get("/getAppByStatus", getAppointmentByStatus);

//HEALTH RECORD
router.get("/healthRecord", viewMyHealthRecord);


//sprint 2

router.get('/viewHealthPackage', viewHealthPackages);
//router.get('/viewPackageDetails',viewHealthPackageDetails);
router.delete('/logoutPatient',logout)
router.post('/changePassPatient',changePassword)
router.patch('/linkFamilyMember',linkFamilyMember)

// Create a route for viewing wallet amount
router.get('/viewWalletAmount',verifyTokenPatient, viewWalletAmount);

//sprint 3
router.get('/getAllPrescriptionsForPatient',getAllPrescriptionsForPatient);
router.get('/getPrescriptionDetails',getPrescriptionDetails);





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolderP = path.join(__dirname, '../uploadsPatient'); // The folder where files will be saved (inside your project)

    // Check if the 'uploads' folder exists, and create it if not
    if (!fs.existsSync(uploadFolderP)) {
      fs.mkdirSync(uploadFolderP);
    }

    cb(null, uploadFolderP);
  },
  // filename: (req, file, cb) => {
  //   cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
  // },
});

const uploadsPatient = multer({ storage });

// Create a route for uploading and submitting required documents


router.patch('/uploadDocs', uploadsPatient.array('documents', 1),verifyTokenPatient, uploadPatintDocs);
router.get('/patientDocument/:filename', openPatientDocument);
router.patch('/deleteDocs', deletePatientDocs);
export default router;

