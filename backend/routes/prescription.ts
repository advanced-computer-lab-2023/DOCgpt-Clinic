import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
  getAllPrescriptionsPatient,
  getAllPrescriptionsDoctor,
  addMedtoPresc,
} from '../controllers/prescriptionController';

const router = express.Router();

// Create a new prescription
router.post('/prescriptions', createPrescription);

// Get all prescriptions
router.get('/prescriptions', getAllPrescriptions);

// Update a prescription
router.put('/prescriptions/:id', updatePrescription);

router.get('/getAllPrescriptionsPatient', getAllPrescriptionsPatient);
router.get('/getAllPrescriptionsDoctor', getAllPrescriptionsDoctor);
router.post('/addMedTopresc/:prescriptionId', addMedtoPresc);



export default router;