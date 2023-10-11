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
exports.getpatientsPrescription = exports.getPatients = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
// create a new workout
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request reached controller');
    try {
        const { username, name, email, password, dateofbirth, mobilenumber, emergencyContact } = req.body;
        const patient = yield patientModel_1.default.create({ username, name, email, password, dateofbirth, mobilenumber, emergencyContact });
        console.log('Patient created!', patient);
        res.status(200).json(patient);
    }
    catch (error) {
        const err = error;
        console.log('Error creating patient');
        res.status(400).json({ error: err.message });
    }
});
exports.createPatient = createPatient;
// get all workouts 
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Patients = yield patientModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(Patients);
});
exports.getPatients = getPatients;
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const patientModel_2 = __importDefault(require("../models/patientModel"));
const getpatientsPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("im here");
    try {
        const { username } = req.params;
        const patient = yield patientModel_2.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const { date, doctorUsername, filled } = req.query;
        const filters = { patientUsername: username };
        if (date) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            if (date === 'currentMonth') {
                filters.date = {
                    $gte: new Date(currentYear, currentMonth, 1),
                    $lte: currentDate,
                };
            }
            else if (date === 'earlier') {
                filters.date = { $lt: new Date(currentYear, currentMonth, 1) };
            }
        }
        if (doctorUsername) {
            filters.doctorUsername = doctorUsername;
        }
        if (filled === 'true' || filled === 'false') {
            filters.filled = filled === 'true';
        }
        console.log(filters);
        const prescriptions = yield perscriptionModel_1.default.find(filters);
        res.json(prescriptions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
});
exports.getpatientsPrescription = getpatientsPrescription;
