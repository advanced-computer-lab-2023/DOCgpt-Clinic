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
exports.uploadAndSubmitReqDocs = exports.viewHealthRecord = exports.viewHealthRecords = exports.selectPatient = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewPatientsUpcoming = exports.viewMyPatients = exports.updateDoctorAffiliation = exports.updateDoctorHourlyRate = exports.updateDoctorEmail = exports.createDoctors = exports.searchPatient = exports.getDoctor = exports.getDoctors = void 0;
const multer_1 = __importDefault(require("multer"));
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
const getAppointmentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const date = req.query.date;
    const appoinments = yield appointmentModel_1.default.find({ doctor: doctorUsername, date: date }).exec();
    res.status(200).json(appoinments);
});
exports.getAppointmentByDate = getAppointmentByDate;
const getAppointmentByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const status = req.query.status;
    const appoinments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: status }).exec();
    res.status(200).json(appoinments);
});
exports.getAppointmentByStatus = getAppointmentByStatus;
const selectPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.query.patientId;
    const patient = yield patientModel_1.default.findById(patientId);
    res.status(200).json(patient);
});
exports.selectPatient = selectPatient;
const viewHealthRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
    const healthRecords = [];
    const usernames = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = yield patientModel_1.default.findOne({ username: username }).exec();
        console.log(patient);
        if (patient != null) {
            const patientId = patient._id;
            console.log(patientId);
            const healthRecord = yield healthRecordModel_1.default.findOne({ patientId: patientId }).populate('patientId').exec();
            if (!usernames.includes(username)) {
                healthRecords.push(healthRecord);
                usernames.push(username);
            }
        }
    }
    res.status(200).json(healthRecords);
});
exports.viewHealthRecords = viewHealthRecords;
const viewHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.query.patientId;
    const healthRecord = yield healthRecordModel_1.default.findById(patientId);
    res.status(200).json(healthRecord);
});
exports.viewHealthRecord = viewHealthRecord;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/rawan/Desktop/uploads'); // The folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const uploadAndSubmitReqDocs = (req, res) => {
    upload.array('documents', 3)(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' });
        }
        const uploadedFiles = req.files;
        console.log('Uploaded Files:', uploadedFiles);
        // Handle saving file information and associating it with the doctor's registration here
        res.json({ message: 'Documents uploaded and submitted successfully.' });
    });
};
exports.uploadAndSubmitReqDocs = uploadAndSubmitReqDocs;
