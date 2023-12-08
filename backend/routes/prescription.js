"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prescriptionController_1 = require("../controllers/prescriptionController");
const router = express_1.default.Router();
// Create a new prescription
router.post('/prescriptions', prescriptionController_1.createPrescription);
// Get all prescriptions
router.get('/prescriptions', prescriptionController_1.getAllPrescriptions);
// Update a prescription
router.put('/prescriptions/:id', prescriptionController_1.updatePrescription);
//sprint 3
router.get('/getAllPrescriptionsPatient', prescriptionController_1.getAllPrescriptionsPatient);
router.get('/getPrescriptionDetails', prescriptionController_1.getPrescriptionDetails);
router.get('/getAllPrescriptionsDoctor', prescriptionController_1.getAllPrescriptionsDoctor);
router.post('/addMedTopresc/:prescriptionId', prescriptionController_1.addMedtoPresc);
router.post('/addToCart', prescriptionController_1.addPrescriptionToCart);
router.post('/changeStatus', prescriptionController_1.changeStatus);
exports.default = router;
