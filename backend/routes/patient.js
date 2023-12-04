"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = require("../controllers/patientController");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const patientController_2 = require("../controllers/patientController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// GET all patients
router.get('/getP', patientController_1.getPatients);
router.put('/addfammember', patientController_1.verifyTokenPatient, patientController_1.addFamilyMember);
router.get("verifyToken", patientController_1.verifyTokenPatient);
// GET a single patient
// router.get('/:id', getPatient);
router.post('/postP', patientController_1.createPatient);
router.get('/viewFam', patientController_1.verifyTokenPatient, patientController_1.viewFamilyMembers);
router.get('/getPatientprescriptions', patientController_1.getPrescriptionsByUser);
router.get('/doctors', patientController_1.getDoctor);
router.get('/doctors/search', patientController_1.searchDoctors);
router.get('/doctors/filter', patientController_1.filterDoctors);
router.get('/doctors/view', patientController_1.getDoctorDetails);
router.get('/doctors/select', patientController_1.selectDoctors);
//APPOINTMENTS 
router.get('/getMyAppointments', patientController_1.getPatientAppointments);
router.get("/pastApp", patientController_2.viewPastAppointments);
router.get("/upcomingApp", patientController_1.viewUpcomingAppointments);
router.get("/getAppByDate", patientController_1.getAppointmentByDate);
router.get("/getAppByStatus", patientController_1.getAppointmentByStatus);
//HEALTH RECORD
router.get("/healthRecord", patientController_1.viewMyHealthRecord);
//sprint 2
router.get('/viewHealthPackage', patientController_1.viewHealthPackages);
//router.get('/viewPackageDetails',viewHealthPackageDetails);
router.delete('/logoutPatient', patientController_1.logout);
router.post('/changePassPatient', patientController_1.changePassword);
router.patch('/linkFamilyMember', patientController_1.linkFamilyMember);
// Create a route for viewing wallet amount
router.get('/viewWalletAmount', patientController_1.verifyTokenPatient, patientController_1.viewWalletAmount);
router.get('/getTodApp', patientController_1.verifyTokenPatient, patientController_1.getTodayAppointments);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadFolderP = path_1.default.join(__dirname, '../uploadsPatient'); // The folder where files will be saved (inside your project)
        // Check if the 'uploads' folder exists, and create it if not
        if (!fs_1.default.existsSync(uploadFolderP)) {
            fs_1.default.mkdirSync(uploadFolderP);
        }
        cb(null, uploadFolderP);
    },
    // filename: (req, file, cb) => {
    //   cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
    // },
});
const uploadsPatient = (0, multer_1.default)({ storage });
// Create a route for uploading and submitting required documents
router.patch('/uploadDocs', uploadsPatient.array('documents', 1), patientController_1.verifyTokenPatient, patientController_1.uploadPatintDocs);
router.get('/patientDocument/:filename', patientController_1.openPatientDocument);
router.patch('/deleteDocs', patientController_1.deletePatientDocs);
exports.default = router;
