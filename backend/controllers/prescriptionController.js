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
exports.addPrescriptionToCart = exports.addMedicineToPrescription = exports.getAllPrescriptionsDoctor = exports.getPrescriptionDetails = exports.getAllPrescriptionsPatient = exports.updatePrescription = exports.getAllPrescriptions = exports.addMedtoPresc = exports.createPrescription = void 0;
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const doctorModel_2 = __importDefault(require("../models/doctorModel"));
const axios_1 = __importDefault(require("axios"));
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
const getPrescriptionDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prescriptionId } = req.body;
        if (!prescriptionId) {
            return res.status(400).json({ error: 'Prescription ID is required' });
        }
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        return res.status(200).json({ prescription });
    }
    catch (error) {
        console.error('Error getting prescription details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPrescriptionDetails = getPrescriptionDetails;
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
const addPrescriptionToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const medicineInfoArray = [];
        const { prescriptionId } = req.body;
        // Find the prescription by ID
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        for (const medicine of prescription.Medicines) {
            const { medicineName, dosage, quantity } = medicine;
            // Get medicine ID
            const idResponse = yield axios_1.default.post('http://localhost:3000/api/medicines/getId', {
                medicineName
            });
            const medicineId = idResponse.data.medicineId;
            console.log(idResponse);
            // Get medicine price
            const priceResponse = yield axios_1.default.post('http://localhost:3000/api/medicines/getPrice', {
                medicineName
            });
            const medicinePrice = Number(priceResponse.data.medicinePrice);
            const v = { medicineId, quantity, medicineName, medicinePrice, prescriptionId };
            // Add medicine information to the array
            medicineInfoArray.push({
                medicineName,
                medicineId,
                medicinePrice,
                quantity,
                prescriptionId
            });
            try {
                const nn = yield axios_1.default.post('http://localhost:3000/api/cart/addMed', v, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            catch (error) {
                console.error('Error adding medicine to cart:', error);
                return res.status(500).json({ error });
            }
        }
        prescription.status == "filled";
        yield prescription.save();
        // Respond with the accumulated medicine information
        return res.status(200).json({
            message: 'Prescription added to cart successfully',
            medicines: medicineInfoArray,
        });
    }
    catch (error) {
        console.log('Error adding prescription to cart:', error);
        return res.status(500).json({ error: 'Error adding prescription to cart' });
    }
});
exports.addPrescriptionToCart = addPrescriptionToCart;
