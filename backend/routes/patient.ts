import express, { Router } from 'express';
import {
  getPatients,
  createPatient,
} from '../controllers/patientController';

import{
  getpatientsPrescription
} from '../controllers/patientController';

const router: Router = express.Router();

// GET all patients
router.get('/getP', getPatients);

// GET a single patient
// router.get('/:id', getPatient);

// POST a new patient
router.post('/postP', createPatient);

// DELETE a patient
// router.delete('/:id', deletePatient);

// UPDATE a patient
// router.patch('/:id', updatePatient);


// get patient's prescriptions
router.get('/:username/prescriptions', getpatientsPrescription);

export default router;