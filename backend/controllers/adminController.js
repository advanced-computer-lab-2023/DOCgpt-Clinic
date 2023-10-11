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
exports.getAdmins = exports.viewDoctorInfo = exports.deletePatientByUsername = exports.deleteDoctorByUsername = exports.deleteAdminByUsername = exports.addAdmin = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const admin = yield adminModel_1.default.create({ username, password });
        res.status(200).json(admin);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.addAdmin = addAdmin;
//delete admin
const deleteAdminByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        // Find and delete the admin by username
        const deletedAdmin = yield adminModel_1.default.findOneAndDelete({ username });
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteAdminByUsername = deleteAdminByUsername;
//delete Doctor
const deleteDoctorByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        // Find and delete the Doctor by username
        const deletedDoctor = yield doctorModel_1.default.findOneAndDelete({ username });
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteDoctorByUsername = deleteDoctorByUsername;
//delete Patient
const deletePatientByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        // Find and delete the Doctor by username
        const deletedPatient = yield patientModel_1.default.findOneAndDelete({ username });
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deletePatientByUsername = deletePatientByUsername;
// view doctor Info
const viewDoctorInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        // Find the doctor by username
        const doctor = yield doctorModel_1.default.findOne({ username });
        if (!doctor) {
            res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ doctor });
    }
    catch (error) {
        // Handle any errors here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.viewDoctorInfo = viewDoctorInfo;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const admins = yield adminModel_1.default.find();
        res.json({ admins });
    }
    catch (error) {
        // Handle any errors here
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAdmins = getAdmins;
