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
exports.getDoctorByUsername = exports.viewRequests = exports.updateUnfilledPrescription = exports.addOrUpdateDosage = exports.rejectFollowUpRequest = exports.acceptFollowUpRequest = exports.getTodayAppointments = exports.rescheduleAppointments = exports.getContentType = exports.serveDoctorDocument = exports.getDoctorDocuments = exports.viewWalletAmount = exports.commentsHealthRecord = exports.ViewMyTimeSlots = exports.calculateSessionPrice = exports.uploadAndSubmitReqDocs = exports.getPendingDoctor = exports.rejecttDoctorRequest = exports.acceptDoctorRequest = exports.verifyTokenDoctor = exports.changePassword = exports.logout = exports.createToken = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewPastAppointments = exports.viewUpcomingAppointments = exports.viewMyAppointments = exports.addHealthRecord = exports.viewHealthRecord = exports.viewHealthRecords = exports.createfollowUp = exports.removeTimeSlots = exports.addTimeSlots = exports.selectPatient = exports.viewPatientsUpcoming = exports.viewMyPatients = exports.updateDoctorAffiliation = exports.updateDoctorHourlyRate = exports.updateDoctorEmail = exports.createDoctors = exports.searchPatient = exports.getDoctor = exports.getDoctors = void 0;
const path_1 = __importDefault(require("path"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const patientModel_2 = __importDefault(require("../models/patientModel"));
const packageModel_1 = __importDefault(require("../models/packageModel"));
const healthRecordModel_2 = __importDefault(require("../models/healthRecordModel"));
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const requestModel_1 = __importDefault(require("../models/requestModel"));
const appointmentController_1 = require("./appointmentController");
const fs_1 = __importDefault(require("fs"));
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctors = yield doctorModel_1.default.find().exec();
    res.status(200).json(doctors);
});
exports.getDoctors = getDoctors;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
    console.log(doctor);
    res.status(200).json(doctor);
});
exports.getDoctor = getDoctor;
const searchPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientName = String(req.query.patientName);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const appointments = yield appointmentModel_1.default.find({ doctor: doctorUsername, status: "upcoming" }).exec();
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
});
exports.viewPatientsUpcoming = viewPatientsUpcoming;
const selectPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patient;
    const patient = yield patientModel_1.default.findOne({ username: patientUsername }).exec();
    res.status(200).json(patient);
});
exports.selectPatient = selectPatient;
const addTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const doctorUsername = req.query.doctorUsername;
    const { dates } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
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
const removeTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const { dates } = req.body;
    try {
        // Find the doctor by username
        const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
        if (doctor) {
            // Remove time slots from the existing array
            doctor.timeslots = doctor.timeslots.filter((timeslot) => !dates.includes(timeslot.date));
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
exports.removeTimeSlots = removeTimeSlots;
const createfollowUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const doctorUsername = req.query.doctor;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = 'upcoming';
    const type = 'Follow up';
    try {
        // Find the doctor by ID
        const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
        if (doctor) {
            // Remove the time slot from the doctor's timeslots
            console.log('Before removing timeslot:', doctor.timeslots);
            const newDate = new Date(date);
            doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date.getTime() !== newDate.getTime());
            console.log('After removing timeslot:', doctor.timeslots);
            // Save the updated doctor
            yield doctor.save();
            // Create the appointment
            const appoinment = yield appointmentModel_1.default.create({
                status: status,
                doctor: doctorUsername,
                patient: patientUsername,
                date: date,
                type: type,
                scheduledBy: doctorUsername
            });
            res.status(201).json(appoinment);
        }
        else {
            return res.status(404).json({ message: 'Doctor not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});
exports.createfollowUp = createfollowUp;
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
    const healthRecord = yield healthRecordModel_1.default.findOne({ patient: patientUsername });
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
    const pattern = /^(?=.[A-Z])(?=.\d)/;
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
const fs_2 = require("fs");
const appointmentModel_2 = __importDefault(require("../models/appointmentModel"));
const doctorModel_2 = __importDefault(require("../models/doctorModel"));
const uploadAndSubmitReqDocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = req.files;
    //const { username } = req.body; // Assuming the username is sent in the request body
    try {
        const fileInformation = [];
        // Create a folder for the pharmacist if it doesn't exist
        const uploadFolder = path_1.default.join(__dirname, `../uploads`);
        // const uploadFolder = path.join(__dirname, `../uploads/${username}`);
        if (!fs_1.default.existsSync(uploadFolder)) {
            fs_1.default.mkdirSync(uploadFolder);
        }
        // Loop through the uploaded files and save them in the pharmacist's folder
        for (const file of uploadedFiles) {
            const fileData = {
                filename: file.originalname,
                path: path_1.default.join(uploadFolder, file.originalname),
            };
            fileInformation.push(fileData);
            // Create a write stream to save the file
            const writeStream = (0, fs_2.createWriteStream)(fileData.path);
            (0, fs_2.createReadStream)(file.path).pipe(writeStream);
        }
        // You can save the file information wherever needed in your application
        res.json({ documents: fileInformation, message: 'Documents uploaded successfully.' });
    }
    catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.uploadAndSubmitReqDocs = uploadAndSubmitReqDocs;
const calculateSessionPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hourlyRate = req.query.hourlyRate;
        if (!hourlyRate) {
            return res.status(404).json({ error: 'rate not found.' });
        }
        const price = Number(hourlyRate) + 100;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        var patientUsername;
        console.log(tokenDB);
        if (tokenDB) {
            patientUsername = tokenDB.username;
        }
        const patient = yield patientModel_2.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }
        if (patient.healthPackageSubscription.length === 0) {
            console.log('Patient has no health packages subscribed');
            return res.status(200).json(price);
        }
        const subscribedPackage = patient.healthPackageSubscription.find((subscription) => subscription.status === 'subscribed with renewal date');
        if (!subscribedPackage) {
            console.log('No subscribed health package found');
            console.log(price);
            return res.status(200).json(price);
            ;
        }
        const packageName = subscribedPackage.name;
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            throw new Error('Health package not found');
        }
        const discount = price - healthPackage.doctorDiscount * 0.01 * price;
        console.log('Discount:', discount);
        // Perform further calculations or operations with the discount value
        return res.status(200).json(discount);
    }
    catch (error) {
        console.error('Error calculating session price:', error);
        throw error;
    }
});
exports.calculateSessionPrice = calculateSessionPrice;
const ViewMyTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    try {
        const doctor = yield doctorModel_1.default.findOne({ username: doctorUsername }).exec();
        if (doctor) {
            const timeslots = doctor.timeslots;
            res.status(200).json({ timeslots });
        }
        else {
            // Handle case where no matching doctor is found
            res.status(404).json({ error: 'Doctor not found' });
        }
    }
    catch (error) {
        console.error('Error retrieving doctor timeslots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.ViewMyTimeSlots = ViewMyTimeSlots;
const commentsHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const patientUsername = req.query.patientUsername;
    const { section, comment } = req.body;
    try {
        // Save the new document to the database
        const healthRecord = yield healthRecordModel_2.default.findOne({ patient: patientUsername });
        if (!healthRecord) {
            return res.status(404).json({ message: 'Health record not found for the specified patient.' });
        }
        if (section == 'MedicalHistory') {
            (_a = healthRecord.MedicalHistory) === null || _a === void 0 ? void 0 : _a.Comments.push(comment);
        }
        else if (section == 'MedicationList') {
            (_b = healthRecord.MedicationList) === null || _b === void 0 ? void 0 : _b.Comments.push(comment);
        }
        else if (section == 'VitalSigns') {
            (_c = healthRecord.VitalSigns) === null || _c === void 0 ? void 0 : _c.Comments.push(comment);
        }
        else if (section == 'Laboratory') {
            (_d = healthRecord.Laboratory) === null || _d === void 0 ? void 0 : _d.Comments.push(comment);
        }
        else if (section == 'GeneralComments') {
            (_e = healthRecord.GeneralComments) === null || _e === void 0 ? void 0 : _e.push(comment);
        }
        else {
            return res.status(400).json({ message: 'Invalid section provided.' });
        }
        yield healthRecord.save();
        res.status(201).json({ message: 'Record created successfully', healthRecord });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.commentsHealthRecord = commentsHealthRecord;
const viewWalletAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const patientUsername = req.query.patientUsername as string;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: 'username not found' });
        }
        const doctor = yield doctorModel_1.default.findOne({ username }).exec();
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }
        const walletAmount = doctor.walletBalance;
        if (walletAmount === undefined) {
            return res.status(500).json({ error: 'Wallet balance not available.' });
        }
        res.json({ walletAmount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.viewWalletAmount = viewWalletAmount;
const getDoctorDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadFolder = path_1.default.join(__dirname, '../uploads');
        const files = fs_1.default.readdirSync(uploadFolder);
        res.json({ documents: files });
    }
    catch (error) {
        console.error('Error getting pharmacist documents:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.getDoctorDocuments = getDoctorDocuments;
const serveDoctorDocument = (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path_1.default.join(__dirname, '../uploads', filename);
        const fileStream = fs_1.default.createReadStream(filePath);
        fileStream.on('open', () => {
            res.set('Content-Type', 'application/octet-stream');
            fileStream.pipe(res);
        });
        fileStream.on('error', (error) => {
            console.error('Error serving pharmacist document:', error);
            res.status(500).json({ error: 'Internal server error.' });
        });
    }
    catch (error) {
        console.error('Error serving pharmacist document:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
exports.serveDoctorDocument = serveDoctorDocument;
// Helper function to get content type based on file extension
const getContentType = (filename) => {
    const ext = path_1.default.extname(filename).toLowerCase();
    switch (ext) {
        case '.pdf':
            return 'application/pdf';
        case '.docx':
            return 'application/docx';
        case '.png':
            return 'image/png';
        case '.jpeg':
            return 'image/jpeg';
        case '.jpg':
            return 'image/jpg';
        // Add more cases for other file types as needed
        default:
            return 'application/octet-stream';
    }
};
exports.getContentType = getContentType;
const rescheduleAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: 'username not found' });
        }
        const { appointmentId, date } = req.body;
        const newDate = new Date(date);
        const appointment = yield appointmentModel_2.default.findById(appointmentId);
        if (appointment) {
            const updatedAppointment = yield appointmentModel_1.default.create({
                status: "rescheduled",
                doctor: appointment.doctor,
                patient: appointment.patient,
                date: newDate,
                scheduledBy: username,
                type: appointment.type
            });
            const doctor = yield doctorModel_2.default.findOne({ username: username });
            if (doctor) {
                doctor.timeslots.push({ date: appointment.date });
                doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date && timeslot.date.getTime() !== newDate.getTime());
                yield doctor.save();
            }
            appointment.status = "cancelled";
            yield appointment.save();
            res.status(200).json({ updatedAppointment });
            //Send Notificationss(system & mail)//username DOC & PATIENT
            yield (0, appointmentController_1.createNotificationWithCurrentDate)(appointment.patient, "Appointment Rescheduled", `Your appointment has been rescheduled by Doctor: ${username}`);
        }
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.rescheduleAppointments = rescheduleAppointments;
const getTodayAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const doctorUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day
    const appointments = yield appointmentModel_2.default
        .find({
        doctor: doctorUsername,
        date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }, // Filter for today's appointments
    })
        .exec();
    res.status(200).json(appointments);
});
exports.getTodayAppointments = getTodayAppointments;
//accept/reject follow up request 
const acceptFollowUpRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: 'username not found' });
        }
        const { requestId } = req.body;
        const request = yield requestModel_1.default.findById(requestId);
        if (request) {
            request.status = "accepted";
            yield request.save();
            const doctor = yield doctorModel_2.default.findOne({ username });
            var notificationSubject = "";
            var notificationMessage = "";
            if (doctor) {
                const newDate = request.followUpDate;
                if (newDate) {
                    doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date.getTime() !== newDate.getTime());
                }
                notificationSubject = "Follow Up Scheduled Successfully";
                notificationMessage = `Your follow up appointment request has been accepted by Doctor: ${doctor.username}`;
                yield doctor.save();
            }
            //Send Notificationss(system & mail)//username DOC & PATIENT
            const appointment = yield appointmentModel_1.default.create({
                status: "upcoming",
                doctor: request.doctor,
                patient: request.patient,
                date: request.followUpDate,
                type: "Follow up",
                price: 0,
                paid: true,
                scheduledBy: request.requestedBy,
            });
            if (request.requestedBy != request.patient) {
                // send to request.patient and request.requestedBy
                (0, appointmentController_1.createNotificationWithCurrentDate)(request.patient, notificationSubject, notificationMessage);
                (0, appointmentController_1.createNotificationWithCurrentDate)(request.requestedBy, notificationSubject, notificationMessage);
            }
            else {
                //send to request.patient
                (0, appointmentController_1.createNotificationWithCurrentDate)(request.patient, notificationSubject, notificationMessage);
            }
            return res.status(200).json({ appointment });
        }
    }
    catch (error) {
        console.error("Error accept Req", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.acceptFollowUpRequest = acceptFollowUpRequest;
const rejectFollowUpRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: 'username not found' });
        }
        const doctor = doctorModel_2.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'doctor not found' });
        }
        const { requestId } = req.body;
        const request = yield requestModel_1.default.findById(requestId);
        if (request) {
            request.status = "rejected";
            yield request.save();
            //Send Notificationss(system & mail)//username DOC & PATIENT
            const notificationSubject = "Follow Up Rejected";
            const notificationMessage = `Your follow up request has been rejected by Doctor: ${username}`;
            if (request.requestedBy != request.patient) {
                // send to request.patient and request.requestedBy
                const patientNotification = yield (0, appointmentController_1.createNotificationWithCurrentDate)(request.patient, notificationSubject, notificationMessage);
                const requestedByPatientNoti = yield (0, appointmentController_1.createNotificationWithCurrentDate)(request.requestedBy, notificationSubject, notificationMessage);
            }
            else {
                //send to request.patient
                (0, appointmentController_1.createNotificationWithCurrentDate)(request.patient, notificationSubject, notificationMessage);
            }
            return res.status(200).json({ message: "Request rejected successfully" });
        }
    }
    catch (error) {
        console.error("Error accept Req", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.rejectFollowUpRequest = rejectFollowUpRequest;
const addOrUpdateDosage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prescriptionId, medicineName, dosage } = req.body;
        if (!prescriptionId || !medicineName || !dosage) {
            return res.status(400).json({ error: 'Prescription ID, medicine name, and dosage are required' });
        }
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        // Check if the medicine is already in the prescription
        const existingMedicine = prescription.Medicines.find((medicine) => medicine.medicineName === medicineName);
        if (existingMedicine) {
            // Update dosage if the medicine is already in the prescription
            existingMedicine.dosage = dosage;
        }
        else {
            // Add the medicine with dosage if it's not in the prescription
            prescription.Medicines.push({ medicineName, dosage });
        }
        // Save the updated prescription
        yield prescription.save();
        return res.status(200).json({ message: 'Dosage added/updated successfully', prescription });
    }
    catch (error) {
        console.error('Error adding/updating dosage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addOrUpdateDosage = addOrUpdateDosage;
const updateUnfilledPrescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prescriptionId, medicineName, dosage, quantity } = req.body;
        if (!prescriptionId || !medicineName || !dosage || !quantity) {
            return res.status(400).json({ error: 'Prescription ID, medicine name, quantity and dosage are required' });
        }
        const prescription = yield perscriptionModel_1.default.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        // Check if the prescription is already filled
        if (prescription.status == "filled") {
            return res.status(400).json({ error: 'Prescription has already been filled' });
        }
        // Check if the medicine is already in the prescription
        const existingMedicine = prescription.Medicines.find((medicine) => medicine.medicineName === medicineName);
        if (existingMedicine) {
            // Update dosage if the medicine is already in the prescription
            existingMedicine.dosage = dosage;
            existingMedicine.quantity = quantity;
        }
        else {
            // Add the medicine with dosage if it's not in the prescription
            prescription.Medicines.push({ medicineName, dosage, quantity });
        }
        // Save the updated prescription
        yield prescription.save();
        return res.status(200).json({ message: 'Prescription updated successfully', prescription });
    }
    catch (error) {
        console.error('Error updating prescription:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateUnfilledPrescription = updateUnfilledPrescription;
const viewRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: 'username not found' });
        }
        const doctor = doctorModel_2.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'doctor not found' });
        }
        const requests = yield requestModel_1.default.find({ doctor: username });
        return res.status(200).json({ requests });
    }
    catch (error) {
        console.error("Error accept Req", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.viewRequests = viewRequests;
const getDoctorByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorUsername } = req.query;
    const doctor = yield doctorModel_1.default.find({ username: doctorUsername });
    return res.status(200).json({ doctor });
});
exports.getDoctorByUsername = getDoctorByUsername;
