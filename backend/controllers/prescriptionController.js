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
exports.updateMedicineInPrescription = exports.getAllPrescriptionsDoctor = exports.getAllPrescriptionsPatient = exports.getpatientsPrescription = exports.updatePrescription = exports.getAllPrescriptions = exports.viewMedicineNamesInPrescription = exports.addMedtoPresc = exports.deleteMedicineFromPresc = exports.createPrescription = void 0;
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
const deleteMedicineFromPresc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptionId = req.query.prescriptionId; // Consider using req.params if using route parameters
        const { medicineName } = req.body; // Extract medicineName from req.body
        // Ensure that medicineName is provided
        if (!medicineName) {
            return res.status(400).send({ message: 'Medicine name is required.' });
        }
        const updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(prescriptionId, { $pull: { Medicines: { medicineName } } }, // Assumes medicineName is a direct field
        { new: true });
        if (!updatedPrescription) {
            return res.status(404).send({ message: 'Prescription not found or medicine not in prescription.' });
        }
        res.status(200).send({ message: 'Medicine removed from prescription successfully.', updatedPrescription });
    }
    catch (error) {
        res.status(500).send({ message: 'Error removing medicine from prescription', error });
    }
});
exports.deleteMedicineFromPresc = deleteMedicineFromPresc;
const addMedtoPresc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prescriptionId = req.params.prescriptionId;
        const { medicineName, quantity, dosage } = req.body;
        // Find the prescription and check if the medicine already exists
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found.' });
        }
        const existingMedicineIndex = prescription.Medicines.findIndex(med => med.medicineName === medicineName);
        let updatedPrescription;
        if (existingMedicineIndex !== -1) {
            // Medicine exists, increment the quantity
            const incrementQuantity = { [`Medicines.${existingMedicineIndex}.quantity`]: quantity };
            updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(prescriptionId, { $inc: incrementQuantity }, { new: true });
        }
        else {
            // Medicine does not exist, add as a new entry
            updatedPrescription = yield perscriptionModel_1.default.findByIdAndUpdate(prescriptionId, {
                $push: {
                    Medicines: {
                        medicineName,
                        dosage,
                        quantity,
                    },
                },
            }, { new: true });
        }
        res.status(200).send({ message: 'Medicine added to prescription successfully.', updatedPrescription });
    }
    catch (error) {
        res.status(500).send({ message: 'Error adding medicine to prescription', error });
    }
});
exports.addMedtoPresc = addMedtoPresc;
const viewMedicineNamesInPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting prescriptionId from query parameters
        const prescriptionId = req.query.prescriptionId;
        if (!prescriptionId) {
            return res.status(400).send({ message: 'Prescription ID is required.' });
        }
        // Find the prescription by ID and select only the Medicines array
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId).select('Medicines');
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found.' });
        }
        // Extract medicineName, dosage, and quantity from each item in the Medicines array
        const medicines = prescription.Medicines.map(medicine => ({
            medicineName: medicine.medicineName,
            dosage: medicine.dosage,
            quantity: medicine.quantity
        }));
        // Send the list of medicines (including name, dosage, and quantity) as a response
        res.status(200).send({ medicines });
    }
    catch (error) {
        res.status(500).send({ message: 'Error retrieving medicines from prescription', error });
    }
});
exports.viewMedicineNamesInPrescription = viewMedicineNamesInPrescription;
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
// Update medicine details in a prescription
const updateMedicineInPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi1");
    try {
        console.log("hi1");
        const prescriptionId = req.query.prescriptionId;
        const { medicineName, quantity, dosage } = req.body;
        console.log("hi1");
        // Find the prescription
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        console.log("hi2");
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found.' });
        }
        // Find the index of the medicine to update in the Medicines array
        const medicineIndex = prescription.Medicines.findIndex((med) => med.medicineName === medicineName);
        console.log("hi3");
        if (medicineIndex === -1) {
            return res.status(404).send({ message: 'Medicine not found in the prescription.' });
        }
        // Update the medicine details
        prescription.Medicines[medicineIndex].quantity = quantity;
        prescription.Medicines[medicineIndex].dosage = dosage;
        console.log("hi4");
        // Save the updated prescription
        const updatedPrescription = yield prescription.save();
        console.log("hi5");
        res.status(200).send({ message: 'Medicine details updated successfully.', updatedPrescription });
    }
    catch (error) {
        res.status(500).send({ message: 'Error updating medicine details in prescription', error });
    }
});
exports.updateMedicineInPrescription = updateMedicineInPrescription;
