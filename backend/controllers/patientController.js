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
exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.selectDoctors = exports.searchDoctors = exports.getDoctorDetails = exports.filterDoctors = exports.getDoctor = exports.viewFamilyMembers = exports.addFamilyMember = exports.getpatientsPrescription = exports.getPatients = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
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
const patientModel_3 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const getpatientsPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
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
const addFamilyMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(404).json({ error: 'No such patient' });
        }
        // Assuming you have a route parameter for the patient's ID
        const familyMemberData = req.body; // Assuming family member data is sent in the request body
        // Find the patient by ID
        const patient = yield patientModel_3.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        console.log(patient);
        // Add the new family member object to the patient's record
        patient.familyMembers.push({
            name: familyMemberData.name,
            nationalId: familyMemberData.nationalId,
            age: familyMemberData.age,
            gender: familyMemberData.gender,
            relationToPatient: familyMemberData.relationToPatient,
        });
        yield patient.save();
        return res.status(201).json({ message: 'Family member added successfully', patient });
    }
    catch (error) {
        console.error('Error adding family member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addFamilyMember = addFamilyMember;
//view family members 
const viewFamilyMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(404).json({ error: 'user name is required' });
        }
        // Find the patient by ID
        const patient = yield patientModel_3.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Return the family members array
        return res.status(200).json({ familyMembers: patient.familyMembers });
    }
    catch (error) {
        console.error('Error viewing family members:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewFamilyMembers = viewFamilyMembers;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctorModel_1.default.find({}, 'name speciality hourlyRate');
        const doctorsWithSessionPrice = [];
        for (const doctor of doctors) {
            //const hourlyRate = doctor.hourlyRate;
            const sessionPrice = (130 + 0.1) - 0.5;
            const doctorWithSessionPrice = Object.assign(Object.assign({}, doctor.toObject()), { sessionPrice });
            doctorsWithSessionPrice.push(doctorWithSessionPrice);
        }
        res.status(200).json(doctorsWithSessionPrice);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getDoctor = getDoctor;
const filterDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const speciality = req.query.speciality;
    let doctors = [];
    const date = req.query.date;
    if (speciality) {
        doctors = yield doctorModel_1.default.find({ speciality: speciality }).exec();
    }
    else {
        doctors = yield doctorModel_1.default.find();
    }
    const resultDoctors = [];
    for (const doctor of doctors) {
        const appointments = yield appointmentModel_1.default.find({ date: date, doctor: doctor.username });
        if (appointments.length === 0) {
            resultDoctors.push(doctor);
        }
    }
    res.status(200).json(resultDoctors);
});
exports.filterDoctors = filterDoctors;
const getDoctorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.query;
        const doctor = yield doctorModel_1.default.findById(_id);
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }
        res.status(200).json(doctor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving doctor details' });
    }
});
exports.getDoctorDetails = getDoctorDetails;
const searchDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, speciality } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, 'i') };
        }
        if (speciality) {
            query.speciality = { $regex: new RegExp(speciality, 'i') };
        }
        const doctors = yield doctorModel_1.default.find(query);
        if (doctors.length === 0) {
            res.status(404).json({ error: 'No doctors found' });
            return;
        }
        res.status(200).json(doctors);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for doctors' });
    }
});
exports.searchDoctors = searchDoctors;
const selectDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.query;
        const doctor = yield doctorModel_1.default.findById(_id);
        if (!doctor) {
            res.status(404).json({ error: 'Doctor not found' });
            return;
        }
        // Handle the logic for selecting the doctor.
        // Example: Update the doctor's status or perform any other actions.
        res.status(200).json(doctor);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while selecting the doctor' });
    }
});
exports.selectDoctors = selectDoctors;
const appointmentModel_2 = __importDefault(require("../models/appointmentModel"));
const getAppointmentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
    const appoinments = yield appointmentModel_2.default.find({ patient: patientUsername, date: date }).exec();
    res.status(200).json(appoinments);
});
exports.getAppointmentByDate = getAppointmentByDate;
const getAppointmentByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const status = req.query.status;
    const appoinments = yield appointmentModel_2.default.find({ patient: patientUsername, status: status }).exec();
    res.status(200).json(appoinments);
});
exports.getAppointmentByStatus = getAppointmentByStatus;
