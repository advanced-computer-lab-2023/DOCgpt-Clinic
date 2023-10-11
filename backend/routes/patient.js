"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controllers/patientController");
const patientController_2 = require("../controllers/patientController");
const router = express_1.default.Router();
// GET all patients
router.get('/getP', patientController_1.getPatients);
// GET a single patient
// router.get('/:id', getPatient);
// POST a new patient
router.post('/postP', patientController_1.createPatient);
// DELETE a patient
// router.delete('/:id', deletePatient);
// UPDATE a patient
// router.patch('/:id', updatePatient);
// get patient's prescriptions
router.get('/:username/prescriptions', patientController_2.getpatientsPrescription);
exports.default = router;
