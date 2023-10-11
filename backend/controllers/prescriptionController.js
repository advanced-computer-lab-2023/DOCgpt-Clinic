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
exports.getpatientsPrescription = exports.updatePrescription = exports.getAllPrescriptions = exports.createPrescription = void 0;
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
// Create a new prescription
const createPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorUsername, patientUsername, filled } = req.body;
        console.log("hi am herre");
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
            patientUsername,
            filled,
        });
        const savedPrescription = yield prescription.save();
        res.json(savedPrescription);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create prescription' });
    }
});
exports.createPrescription = createPrescription;
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
        const { filled } = req.body;
        const updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(id, { filled }, { new: true });
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
// Get a single prescription by patient's username
const getpatientsPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("im hererrrr");
    try {
        console.log("im hererrrr");
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
