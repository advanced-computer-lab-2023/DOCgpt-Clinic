"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controllers/doctorController");
const router = express_1.default.Router();
router.get("/", doctorController_1.getDoctors);
router.get("/getDoctor", doctorController_1.getDoctor);
router.get("/searchPatient", doctorController_1.searchPatient);
router.get("/viewMyPatients", doctorController_1.viewMyPatients);
router.get("/selectPatient", doctorController_1.selectPatient);
router.get("/viewPatientsUpcoming", doctorController_1.viewPatientsUpcoming);
//APPOINTMENTS 
router.get("/allMyApp", doctorController_1.viewMyAppointments);
router.get("/upcomingApp", doctorController_1.viewUpcomingAppointments);
router.get("/pastApp", doctorController_1.viewPastAppointments);
router.get("/appointmentsByDate", doctorController_1.getAppointmentByDate);
router.get("/appointmentsByStatus", doctorController_1.getAppointmentByStatus);
//HEALTH RECORDS
router.get("/HealthRecords", doctorController_1.viewHealthRecords);
router.get("/HealthRecord", doctorController_1.viewHealthRecord);
router.post("/addHealthRecord", doctorController_1.addHealthRecord);
router.post("/postDoctor", doctorController_1.createDoctors);
router.patch("/updateEmail", doctorController_1.updateDoctorEmail);
router.patch("/updateRate", doctorController_1.updateDoctorHourlyRate);
router.patch("/updateAffiliation", doctorController_1.updateDoctorAffiliation);
exports.default = router;
