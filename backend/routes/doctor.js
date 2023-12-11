"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controllers/doctorController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const documentModel_1 = __importDefault(require("../models/documentModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
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
router.get("/todayapp", doctorController_1.getTodayAppointments);
//HEALTH RECORDS
router.get("/HealthRecords", doctorController_1.viewHealthRecords);
router.get("/HealthRecord", doctorController_1.viewHealthRecord);
router.patch("/HealthRecord/comments", doctorController_1.commentsHealthRecord);
router.post("/postDoctor", doctorController_1.createDoctors);
router.post("/addHealthRecord", doctorController_1.addHealthRecord);
router.patch("/updateEmail", doctorController_1.updateDoctorEmail);
router.patch("/updateRate", doctorController_1.updateDoctorHourlyRate);
router.patch("/updateAffiliation", doctorController_1.updateDoctorAffiliation);
//create follow up
router.post("/followup", doctorController_1.createfollowUp);
router.patch("/addtimeslot", doctorController_1.addTimeSlots);
router.get("/getSlots", doctorController_1.ViewMyTimeSlots);
router.patch("/removetimeslot", doctorController_1.removeTimeSlots);
router.get('/sessionPrice', doctorController_1.calculateSessionPrice);
// Create a route for viewing wallet amount
router.get('/viewWalletAmount', doctorController_1.verifyTokenDoctor, doctorController_1.viewWalletAmount);
// Set up Multer for file uploads
router.delete('/logoutDoctor', doctorController_1.logout);
router.post('/changePassDoc', doctorController_1.changePassword);
//requests approval 
router.get("/pendingDoctors", doctorController_1.getPendingDoctor);
router.patch("/acceptRequest", doctorController_1.acceptDoctorRequest);
router.patch("/rejectRequest", doctorController_1.rejecttDoctorRequest);
// Define the path to the folder where uploaded documents are stored
const uploadFolder = path_1.default.join(__dirname, 'uploads');
// Configure multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (!fs_1.default.existsSync(uploadFolder)) {
            fs_1.default.mkdirSync(uploadFolder);
        }
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Use the original name provided by the user (assuming it is unique)
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
//Create a route for uploading and submitting required documents
// router.post('/upload', upload.single('file'), (req, res) => {
//   if (req.file && req.body.username) {
//     const { originalname, filename } = req.file;
//     const filePath = path.join('uploads', filename);
//     documentModel.create({ username: req.body.username, document: filename, filePath })
//       .then((result: any) => res.json(result))
//       .catch((err: any) => res.status(500).json({ error: 'Failed to store in the database' }));
//   } else {
//     res.status(400).json({ error: 'File or username not provided' });
//   }
// });
router.post('/upload', upload.array('file', 5), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadedFiles = req.files;
        if (uploadedFiles && req.body.username) {
            // Process each uploaded file
            const promises = uploadedFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const { originalname, filename } = file;
                const filePath = path_1.default.join('uploads', filename);
                // Save document to documentModel
                const documentResult = yield documentModel_1.default.create({
                    username: req.body.username,
                    document: filename,
                    filePath,
                });
                // Update doctor's documents array
                const doctor = yield doctorModel_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { documents: { filename, path: filePath } } }, { new: true });
                return { document: documentResult, doctor };
            }));
            // Wait for all promises to resolve
            const results = yield Promise.all(promises);
            res.json(results);
        }
        else {
            res.status(400).json({ error: 'Files or username not provided' });
        }
    }
    catch (error) {
        console.error('Error in /upload request:', error);
        res.status(500).json({ error: 'Failed to store in the database' });
    }
}));
//router.post('/uploadAndSubmitReqDocs', upload.array('documents', 3), uploadAndSubmitReqDocs);
// // Add a route to get the list of uploaded documents
// router.get('/doctorDocuments', getDoctorDocuments);
// // // Add a route to serve the actual document file
//  router.get('/doctorDocuments/:filename', serveDoctorDocument);
/// Endpoint to get a doctor's documents by username
router.post("/getDoctorDocuments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        // Fetch documents based on the doctor's username
        const documents = yield documentModel_1.default.find({ username });
        // Map the documents to include doctorUsername in the response
        const responseDocuments = documents.map(doc => ({
            doctorUsername: doc.username,
            document: doc.document,
            filePath: doc.filePath
        }));
        res.status(200).json(responseDocuments);
    }
    catch (error) {
        console.error("Error fetching doctor's documents:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Endpoint to download a document
router.post('/downloadDocument', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { document } = req.body;
        // Construct the full path to the document
        const documentPath = path_1.default.join(uploadFolder, document);
        // Check if the file exists
        if (fs_1.default.existsSync(documentPath)) {
            // Read the file and send it in the response
            const fileStream = fs_1.default.createReadStream(documentPath);
            fileStream.pipe(res);
        }
        else {
            // If the file doesn't exist, send a 404 response
            res.status(404).send('File not found');
        }
    }
    catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).send('Internal Server Error');
    }
}));
router.post('/rescheduleApp', doctorController_1.rescheduleAppointments);
router.patch('/acceptFollowUpRequest', doctorController_1.acceptFollowUpRequest);
router.patch('/rejectFollowUpRequest', doctorController_1.rejectFollowUpRequest);
//sprint 3
router.post('/addOrUpdateDosage', doctorController_1.addOrUpdateDosage);
router.patch('/updateUnfilledPrescription', doctorController_1.updateUnfilledPrescription);
exports.default = router;
