import express from 'express';
import {
  createPrescription,
  getAllPrescriptions,
  updatePrescription,
  getAllPrescriptionsPatient,
  getAllPrescriptionsDoctor,
  addMedtoPresc,
  getPrescriptionDetails,
  addPrescriptionToCart , 
  changeStatus,
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
router.get('/getPrescriptionDetails',getPrescriptionDetails);
router.get('/getAllPrescriptionsDoctor', getAllPrescriptionsDoctor);
router.post('/addMedTopresc/:prescriptionId', addMedtoPresc);
router.post('/addToCart',  addPrescriptionToCart);
router.post('/changeStatus',  changeStatus);


router.delete('/removeMedFromPresc', deleteMedicineFromPresc);
router.put('/updateMedicineInPrescription', updateMedicineInPrescription);

export default router;