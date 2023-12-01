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
exports.addMedicineToPrescription = exports.getAllPrescriptionsDoctor = exports.getAllPrescriptionsPatient = exports.getpatientsPrescription = exports.updatePrescription = exports.getAllPrescriptions = exports.addMedtoPresc = exports.createPrescription = void 0;
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const doctorModel_2 = __importDefault(require("../models/doctorModel"));
// Create a new prescription
const createPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const doctorUsername = tokenDB && tokenDB.username;
        const { patientUsername } = req.body;
        // Check if the doctor exists
        const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Check if the patient exists
        const patient = yield patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const prescription = new perscriptionModel_1.default({
            doctorUsername,
            patientUsername
        });
        const savedPrescription = yield prescription.save();
        res.json(savedPrescription);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create prescription' });
    }
});
exports.createPrescription = createPrescription;
// Adjust the path accordingly
const addMedtoPresc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptionId = req.params.prescriptionId;
        const { medicineName, quantity, dosage } = req.body; // Additional details from the request body
        console.log(medicineName);
        console.log(dosage);
        console.log(quantity);
        // Find the prescription and update it
        const updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(prescriptionId, {
            $push: {
                Medicines: {
                    medicineName,
                    dosage,
                    quantity,
                },
            },
        }, { new: true });
        console.log("ana henaaaaaa");
        // Send success response
        res.status(200).send({ message: 'Medicine added to prescription successfully.', updatedPrescription });
    }
    catch (error) {
        // Handle errors
        res.status(500).send({ message: 'Error adding medicine to prescription', error });
    }
});
exports.addMedtoPresc = addMedtoPresc;
// Get all prescriptions
const getAllPrescriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptions = yield perscriptionModel_1.default.find();
        res.json(prescriptions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
});
exports.getAllPrescriptions = getAllPrescriptions;
// Update a prescription
const updatePrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedPrescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.json(updatedPrescription);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update prescription' });
    }
});
exports.updatePrescription = updatePrescription;
// Get patients prescription by patient's username
const getpatientsPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const prescription = yield perscriptionModel_1.default.find({ patientUsername: username });
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.json(prescription);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
});
exports.getpatientsPrescription = getpatientsPrescription;
// Get all prescriptions for a specific patient by patient's username
const getAllPrescriptionsPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        // Check if the patient exists
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Find all prescriptions for the patient
        const prescriptions = yield perscriptionModel_1.default.find({ patientUsername: username })
            .populate('doctorUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
            .select('doctorUsername date status Medicines');
        // Construct response with full prescription details
        const prescriptionDetails = prescriptions.map(prescription => ({
            doctorName: prescription.doctorUsername,
            date: prescription.date,
            status: prescription.status,
            medicines: prescription.Medicines
        }));
        // Respond with the detailed prescriptions
        res.json(prescriptionDetails);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions for the patient' });
    }
});
exports.getAllPrescriptionsPatient = getAllPrescriptionsPatient;
const getAllPrescriptionsDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        const username = tokenDB && tokenDB.username;
        // Check if the patient exists
        const doctor = yield doctorModel_2.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Find all prescriptions for the patient
        const prescriptions = yield perscriptionModel_1.default.find({ doctorUsername: username })
            .populate('patientUsername', 'name') // Populate doctor's name if 'doctorUsername' is a reference
            .select('patientUsername date status Medicines');
        // Construct response with full prescription details
        const prescriptionDetails = prescriptions.map(prescription => ({
            PatientName: prescription.patientUsername,
            date: prescription.date,
            status: prescription.status,
            medicines: prescription.Medicines
        }));
        // Respond with the detailed prescriptions
        res.json(prescriptionDetails);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescriptions for the patient' });
    }
});
exports.getAllPrescriptionsDoctor = getAllPrescriptionsDoctor;
const addMedicineToPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prescriptionId, } = req.query;
        const { dosage, medicine, medicineName } = req.body;
        // Validate the incoming data as necessary
        const updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(prescriptionId, { $push: { Medicines: medicine } }, { new: true, runValidators: true } // Options to return the updated document and run schema validators
        );
        if (!updatedPrescription) {
            return res.status(404).send({ message: 'Prescription not found' });
        }
        res.status(200).send({ message: 'Medicine added successfully', updatedPrescription });
    }
    catch (error) {
        res.status(500).send({ message: 'Error adding medicine to prescription', error });
    }
});
exports.addMedicineToPrescription = addMedicineToPrescription;
