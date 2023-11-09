"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controllers/doctorController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
router.post("/postDoctor", doctorController_1.createDoctors);
router.post("/addHealthRecord", doctorController_1.addHealthRecord);
router.patch("/updateEmail", doctorController_1.updateDoctorEmail);
router.patch("/updateRate", doctorController_1.updateDoctorHourlyRate);
router.patch("/updateAffiliation", doctorController_1.updateDoctorAffiliation);
//create follow up
router.post("/followup", doctorController_1.createfollowUp);
router.patch("/addtimeslot", doctorController_1.addTimeSlots);
router.patch("/removetimeslot", doctorController_1.removeTimeSlots);
// Set up Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/rawan/Desktop/uploads'); // The folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Rename file with a timestamp
    },
});
const upload = (0, multer_1.default)({ storage });
// Create a route for uploading and submitting required documents
router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), doctorController_1.uploadAndSubmitReqDocs);
router.delete('/logoutDoctor', doctorController_1.logout);
router.post('/changePassDoc', doctorController_1.changePassword);
//requests approval 
router.get("/pendingDoctors", doctorController_1.getPendingDoctor);
router.patch("/acceptRequest", doctorController_1.acceptDoctorRequest);
router.patch("/rejectRequest", doctorController_1.rejecttDoctorRequest);
exports.default = router;
