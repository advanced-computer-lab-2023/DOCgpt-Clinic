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
  //viewHealthPackageDetails
} from '../controllers/patientController';

import { viewPastAppointments } from "../controllers/patientController";


const router: Router = express.Router();

// GET all patients
router.get('/getP', getPatients);

router.put('/addfammember', addFamilyMember);



// GET a single patient
// router.get('/:id', getPatient);


router.post('/postP', createPatient);

router.get('/viewFam', viewFamilyMembers);

router.get('/getPatientprescriptions',getPrescriptionsByUser);

router.get('/doctors', getDoctor)


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

export default router;

