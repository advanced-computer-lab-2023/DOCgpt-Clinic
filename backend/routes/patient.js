"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controllers/patientController");
const router = express_1.default.Router();
// GET all patients
router.get('/getP', patientController_1.getPatients);
router.put('/addfammember', patientController_1.addFamilyMember);
// GET a single patient
// router.get('/:id', getPatient);
router.post('/postP', patientController_1.createPatient);
router.get('/viewFam', patientController_1.viewFamilyMembers);
router.get('/getPatientprescriptions', patientController_1.getPrescriptionsByUser);
router.get('/doctors', patientController_1.getDoctor);
router.get('/doctors/search', patientController_1.searchDoctors);
router.get('/doctors/filter', patientController_1.filterDoctors);
router.get('/doctors/view', patientController_1.getDoctorDetails);
router.get('/doctors/select', patientController_1.selectDoctors);
router.get('/getPP', patientController_1.getPatientAppointments);
//sprint 2
router.get('/viewHealthPackage', patientController_1.viewHealthPackages);
//router.get('/viewPackageDetails',viewHealthPackageDetails);
exports.default = router;
