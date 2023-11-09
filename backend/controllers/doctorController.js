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
exports.getPendingDoctor = exports.rejecttDoctorRequest = exports.acceptDoctorRequest = exports.verifyTokenDoctor = exports.changePassword = exports.logout = exports.createToken = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewPastAppointments = exports.viewUpcomingAppointments = exports.viewMyAppointments = exports.addHealthRecord = exports.viewHealthRecord = exports.viewHealthRecords = exports.uploadAndSubmitReqDocs = exports.createfollowUp = exports.addTimeSlots = exports.selectPatient = exports.viewPatientsUpcoming = exports.viewMyPatients = exports.updateDoctorAffiliation = exports.updateDoctorHourlyRate = exports.updateDoctorEmail = exports.createDoctors = exports.searchPatient = exports.getDoctor = exports.getDoctors = void 0;
const multer_1 = __importDefault(require("multer"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
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
    const doctorUsername = req.query.doctor;
    try {
        // FIND THE PATIENTS OF THAT DOCTOR
        const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
        const patients = [];
        const usernames = [];
        for (const appointment of appointments) {
            const username = appointment.get('patient');
            const patient = yield patientModel_1.default.findOne({ username: username }).exec();
            if (patient && !usernames.includes(username)) {
                patients.push(patient);
                usernames.push(username);
            }
        }
        // NOW ARRAY PATIENTS CONTAINS ONLY THE PATIENTS OF THAT DOCTOR
        // SEARCH IN THEM
        const matchingPatients = patients.filter((patient) => patient.get('name').includes(patientName));
        res.json(matchingPatients);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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
    const emailExists = yield patientModel_1.default.findOne({ email });
    const emailExists2 = yield doctorModel_1.default.findOne({ email });
    const emailExists3 = yield adminModel_1.default.findOne({ email });
    const usernameExists = yield patientModel_1.default.findOne({ username });
    const usernameExists2 = yield doctorModel_1.default.findOne({ username });
    const usernameExists3 = yield adminModel_1.default.findOne({ username });
    if (emailExists) {
        return res.status(401).json({ message: 'email exists' });
    }
    if (emailExists2) {
        return res.status(401).json({ message: 'email exists' });
    }
    if (emailExists3) {
        return res.status(401).json({ message: 'email exists' });
    }
    if (usernameExists) {
        return res.status(401).json({ message: 'username exists' });
    }
    if (usernameExists2) {
        return res.status(401).json({ message: 'username exists' });
    }
    if (usernameExists3) {
        return res.status(401).json({ message: 'username exists' });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const doctor = yield doctorModel_1.default.create({
        username: username,
        name: name,
        email: email,
        password: hash,
        dateOfBirth: dateOfBirth,
        hourlyRate: hourlyRate,
        affiliation: affiliation,
        speciality: speciality,
        educationalBackground: educationalBackground,
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
const addTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const { dates } = req.body;
    try {
        // Find the doctor by username
        const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
        if (doctor) {
            // Use push to add new time slots to the existing array
            dates.forEach((date) => {
                doctor.timeslots.push({ date });
            });
            // Save the updated doctor
            const updatedDoctor = yield doctor.save();
            res.status(200).json(updatedDoctor);
        }
        else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});
exports.addTimeSlots = addTimeSlots;
const createfollowUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.body.doctor;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = req.body.status;
    const type = req.body.type;
    const appoinment = yield appointmentModel_1.default.create({
        status: status,
        doctor: doctorUsername,
        patient: patientUsername,
        date: date,
        type: type
    });
    res.status(201).json(appoinment);
});
exports.createfollowUp = createfollowUp;
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
    try {
        const newRecord = new healthRecordModel_1.default(Object.assign({}, req.body));
        // Save the new document to the database
        yield newRecord.save();
        res.status(201).json({ message: 'Record created successfully', record: newRecord });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
function validatePassword(password) {
    // Minimum password length of 8 characters
    if (password.length < 8) {
        return false;
    }
    // Regular expression pattern to check for at least one capital letter and one number
    const pattern = /^(?=.*[A-Z])(?=.*\d)/;
    // Use the test method to check if the password matches the pattern
    if (!pattern.test(password)) {
        return false;
    }
    // All requirements are met
    return true;
}
const createToken = (_id) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }
    console.log("dkhlt hena");
    const token = jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    return token;
};
exports.createToken = createToken;
//logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: 'Token is not valid' });
            }
            const tokenDB = yield tokenModel_1.default.findOneAndDelete({ token: token });
            res.json(tokenDB);
        }));
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.logout = logout;
//change password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: 'Token is not valid' });
            }
            const tokenDB = yield tokenModel_1.default.findOne({ token });
            if (!tokenDB) {
                return res.status(404).json({ message: 'Token not found' });
            }
            const doctor = yield doctorModel_1.default.findOne({ username: tokenDB.username });
            if (!doctor) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, doctor.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            // Validate the new password using the validatePassword function
            if (!validatePassword(newPassword)) {
                return res.status(400).json({ message: 'Invalid new password' });
            }
            // Hash and update the new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            doctor.password = hashedNewPassword;
            yield doctor.save();
            return res.status(200).json({ message: 'Password changed successfully' });
        }));
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
// verify token doctor
const verifyTokenDoctor = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (tokenDB) {
            if (tokenDB.role === 'doctor') {
                next();
            }
            else {
                return res.status(403).json({ message: 'Token is not authorized' });
            }
        }
        else {
            return res.status(403).json({ message: 'Token is not valid 2' });
        }
        // req.user = user;
    }));
};
exports.verifyTokenDoctor = verifyTokenDoctor;
const acceptDoctorRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    try {
        const doctor = yield doctorModel_1.default.findOneAndUpdate({ username: doctorUsername, status: 'pending' }, { status: 'accepted' }, { new: true }).exec();
        res.json(doctor);
    }
    catch (error) {
        console.error('Error accepting doctor request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        throw error;
    }
});
exports.acceptDoctorRequest = acceptDoctorRequest;
const rejecttDoctorRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    try {
        const doctor = yield doctorModel_1.default.findOneAndUpdate({ username: doctorUsername, status: 'pending' }, { status: 'rejected' }, { new: true }).exec();
        res.json(doctor);
    }
    catch (error) {
        console.error('Error Rejecting doctor request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        throw error;
    }
});
exports.rejecttDoctorRequest = rejecttDoctorRequest;
const getPendingDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorModel_1.default.find({ status: 'pending' }).exec();
    console.log(doctor);
    res.status(200).json(doctor);
});
exports.getPendingDoctor = getPendingDoctor;
