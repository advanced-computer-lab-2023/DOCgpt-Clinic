import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
} from '../controllers/prescriptionController';

const router = express.Router();

// Create a new prescription
router.post('/prescriptions', createPrescription);

// Get all prescriptions
router.get('/prescriptions', getAllPrescriptions);

// Update a prescription
router.put('/prescriptions/:id', updatePrescription);


export default router;