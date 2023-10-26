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
exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewPastAppointments = exports.viewUpcomingAppointments = exports.viewMyAppointments = exports.addHealthRecord = exports.viewHealthRecord = exports.viewHealthRecords = exports.selectPatient = exports.viewPatientsUpcoming = exports.viewMyPatients = exports.updateDoctorAffiliation = exports.updateDoctorHourlyRate = exports.updateDoctorEmail = exports.createDoctors = exports.searchPatient = exports.getDoctor = exports.getDoctors = void 0;
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield doctorModel_1.default.find().exec();
    res.status(200).json(doctors);
});
exports.getDoctors = getDoctors;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
    console.log(doctor);
    res.status(200).json(doctor);
});
exports.getDoctor = getDoctor;
const searchPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientName = String(req.query.patientName);
    // find by the full name
    // const patient = await PatientModel.find({ name: patientName }).exec();
    // res.status(200).json(patient);
    // find by just the substring
    const patients = yield patientModel_1.default.find().exec();
    const matchingPatients = patients.filter((patient) => patient.name.includes(patientName));
    res.json(matchingPatients);
});
exports.searchPatient = searchPatient;
const createDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dateOfBirth = req.body.dateOfBirth;
    const hourlyRate = req.body.hourlyRate;
    const affiliation = req.body.affiliation;
    const speciality = req.body.speciality;
    const educationalBackground = req.body.educationalBackground;
    const doctor = yield doctorModel_1.default.create({
        username: username,
        name: name,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        hourlyRate: hourlyRate,
        affiliation: affiliation,
        speciality: speciality,
        educationalBackground: educationalBackground
    });
    res.status(201).json(doctor);
});
exports.createDoctors = createDoctors;
const updateDoctorEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const newEmail = req.body.email;
    const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
    if (doctor != null) {
        doctor.email = newEmail;
        const updatedDoctor = yield doctor.save();
        res.status(200).json(updatedDoctor);
    }
});
exports.updateDoctorEmail = updateDoctorEmail;
const updateDoctorHourlyRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const newRate = req.body.hourlyRate;
    const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
    if (doctor != null) {
        doctor.hourlyRate = newRate;
        const updatedDoctor = yield doctor.save();
        res.status(200).json(updatedDoctor);
    }
});
exports.updateDoctorHourlyRate = updateDoctorHourlyRate;
const updateDoctorAffiliation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const newAffiliation = req.body.affiliation;
    const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
    if (doctor != null) {
        doctor.affiliation = newAffiliation;
        const updatedDoctor = yield doctor.save();
        res.status(200).json(updatedDoctor);
    }
});
exports.updateDoctorAffiliation = updateDoctorAffiliation;
const viewMyPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
    const patients = [];
    const usernames = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = yield patientModel_1.default.findOne({ username: username }).exec();
        if (!usernames.includes(username)) {
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
    // res.status(200).json(patients);
});
exports.viewMyPatients = viewMyPatients;
const viewPatientsUpcoming = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: "upcoming" }).exec();
    const patients = [];
    const usernames = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = yield patientModel_1.default.findOne({ username: username }).exec();
        if (!usernames.includes(username)) {
            patients.push({ date: appoinment.date });
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
});
exports.viewPatientsUpcoming = viewPatientsUpcoming;
const selectPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.query.patientId;
    const patient = yield patientModel_1.default.findById(patientId);
    res.status(200).json(patient);
});
exports.selectPatient = selectPatient;
// HEALTH RECORDS
//VIEW ALL MY PATIENTS HEALTH RECORDS
const viewHealthRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
    const healthRecords = [];
    const usernames = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const healthRecord = yield healthRecordModel_1.default.findOne({ patient: username }).exec();
        if (!usernames.includes(username)) {
            healthRecords.push(healthRecord);
            usernames.push(username);
        }
    }
    res.status(200).json(healthRecords);
});
exports.viewHealthRecords = viewHealthRecords;
//VIEW A HEALTH RECORD FOR A SPECIFIC PATIENT
const viewHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const healthRecord = yield healthRecordModel_1.default.find({ patient: patientUsername });
    res.status(200).json(healthRecord);
});
exports.viewHealthRecord = viewHealthRecord;
//ADD A HEALTH RECORD FOR CHOSEN PATIENT
const addHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = req.query.patientUsername;
    const MedicalHistory = req.body.MedicalHistory;
    const MedicationList = req.body.MedicationList;
    const VitalSigns = req.body.VitalSigns;
    const healthRecord = yield healthRecordModel_1.default.create({
        patient: patient,
        MedicalHistory: MedicalHistory,
        MedicationList: MedicationList,
        VitalSigns: VitalSigns
    });
    res.status(200).json(healthRecord);
});
exports.addHealthRecord = addHealthRecord;
// APPOINTMENTS
// VIEW ALL MY APPOINTMENTS
const viewMyAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorUsername = req.query.doctorUsername;
        const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
        if (!appointments) {
            return res.status(404).json({ message: 'You Have No Appointments Yet!' });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewMyAppointments = viewMyAppointments;
// VIEW UPCOMING APPOINTMENTS
const viewUpcomingAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorUsername = req.query.doctorUsername;
        const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: 'upcoming' });
        if (!appointments) {
            return res.status(404).json({ message: 'You Have No Upcoming Appointments Yet!' });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewUpcomingAppointments = viewUpcomingAppointments;
// VIEW PAST APPOINTMENTS 
const viewPastAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorUsername = req.query.doctorUsername;
        const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: { $in: ['cancelled', 'completed', 'rescheduled'] } });
        if (!appointments) {
            return res.status(404).json({ message: 'You Have No Past Appointments Yet!' });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewPastAppointments = viewPastAppointments;
// FILTER APPOINTMENTS BY DATE
const getAppointmentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorUsername = req.query.doctorUsername;
        const date = req.query.date;
        const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, date: date }).exec();
        if (!appointments) {
            return res.status(404).json({ message: 'You Have No Appointments On this date!' });
        }
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAppointmentByDate = getAppointmentByDate;
// FILTER APPOINTMENTS BY STATUS
const getAppointmentByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const status = req.query.status;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: status }).exec();
    res.status(200).json(appointments);
});
exports.getAppointmentByStatus = getAppointmentByStatus;
