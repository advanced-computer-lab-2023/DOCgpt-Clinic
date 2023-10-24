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
  viewDoctorAppointments,
  //viewHealthPackageDetails
} from '../controllers/patientController';



const router: Router = express.Router();

// GET all patients
router.get('/getP', getPatients);

router.put('/addfammember', addFamilyMember);



// GET a single patient
// router.get('/:id', getPatient);


router.post('/postP', createPatient);

router.get('/viewFam', viewFamilyMembers);

router.get('/getPatientprescriptions',getPrescriptionsByUser);

router.get('/doctors', getDoctor);
router.get('/getDRslots', viewDoctorAppointments);


router.get('/doctors/search', searchDoctors);

router.get('/doctors/filter', filterDoctors);


router.get('/doctors/view', getDoctorDetails);

router.get('/doctors/select', selectDoctors);

router.get('/getPP',getPatientAppointments);

//sprint 2

router.get('/viewHealthPackage', viewHealthPackages);
//router.get('/viewPackageDetails',viewHealthPackageDetails);

export default router;

