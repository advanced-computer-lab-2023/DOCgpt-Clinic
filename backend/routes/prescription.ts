import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
  getAllPrescriptionsPatient,
  getAllPrescriptionsDoctor,
  addMedtoPresc,
  getPrescriptionDetails,
  addPrescriptionToCart
} from '../controllers/prescriptionController';

const router = express.Router();

// Create a new prescription
router.post('/prescriptions', createPrescription);

// Get all prescriptions
router.get('/prescriptions', getAllPrescriptions);

// Update a prescription
router.put('/prescriptions/:id', updatePrescription);

//sprint 3
router.get('/getAllPrescriptionsPatient', getAllPrescriptionsPatient);
router.get('/getPrescriptionDetails',getPrescriptionDetails);
router.get('/getAllPrescriptionsDoctor', getAllPrescriptionsDoctor);
router.post('/addMedTopresc/:prescriptionId', addMedtoPresc);
router.get('/addToCart',  addPrescriptionToCart);




export default router;