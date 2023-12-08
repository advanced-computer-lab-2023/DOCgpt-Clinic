import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
  getAllPrescriptionsPatient,
  getAllPrescriptionsDoctor,
  addMedtoPresc,
  deleteMedicineFromPresc,
  viewMedicineNamesInPrescription,
  updateMedicineInPrescription
} from '../controllers/prescriptionController';

const router = express.Router();

// Create a new prescription
router.post('/prescriptions', createPrescription);

// Get all prescriptions
router.get('/prescriptions', getAllPrescriptions);

// Update a prescription
router.put('/prescriptions/:id', updatePrescription);
router.get('/viewMedicineNamesInPrescription', viewMedicineNamesInPrescription);
router.get('/getAllPrescriptionsPatient', getAllPrescriptionsPatient);
router.get('/getAllPrescriptionsDoctor', getAllPrescriptionsDoctor);
router.post('/addMedTopresc/:prescriptionId', addMedtoPresc);
router.delete('/removeMedFromPresc', deleteMedicineFromPresc);
router.put('/updateMedicineInPrescription', updateMedicineInPrescription);


export default router;