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
exports.linkFamilyMember = exports.verifyTokenPatient = exports.changePassword = exports.logout = exports.createToken = exports.viewMyHealthRecord = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewUpcomingAppointments = exports.viewPastAppointments = exports.getPatientAppointments = exports.viewDoctorAppointments = exports.viewHealthPackageDetails = exports.viewHealthPackages = exports.selectDoctors = exports.searchDoctors = exports.getDoctorDetails = exports.filterDoctors = exports.getDoctor = exports.viewFamilyMembers = exports.addFamilyMember = exports.getPrescriptionsByUser = exports.getPatients = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const packageModel_1 = __importDefault(require("../models/packageModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create a new workout
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request reached controller');
    try {
        const { username, name, email, password, dateofbirth, mobilenumber, emergencyContact, healthPackageSubscription } = req.body;
        const emailExists = yield patientModel_1.default.findOne({ email });
        const emailExists2 = yield doctorModel_2.default.findOne({ email });
        const emailExists3 = yield adminModel_1.default.findOne({ email });
        const usernameExists = yield patientModel_1.default.findOne({ username });
        const usernameExists2 = yield doctorModel_2.default.findOne({ username });
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
        const patient = yield patientModel_1.default.create({ username, name, email, password: hash, dateofbirth, mobilenumber, emergencyContact, healthPackageSubscription });
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
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const getPrescriptionsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.username;
        const dateString = req.query.date; // Assert the type as string
        const filled = req.query.filled;
        const doctorUsername = req.query.doctorUsername;
        const filters = { patientUsername: username };
        if (dateString) {
            // Parse the date string into a JavaScript Date object
            const dateParts = dateString.split('_');
            if (dateParts.length === 3) {
                const year = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
                const day = parseInt(dateParts[2], 10);
                const dateObject = new Date(year, month, day);
                // Filter appointments that match the provided date
                filters.date = dateObject;
            }
        }
        if (filled) {
            filters.filled = filled;
        }
        if (doctorUsername) {
            filters.doctorUsername = doctorUsername;
        }
        const prescriptions = yield perscriptionModel_1.default.find(filters).exec();
        res.status(200).json(prescriptions);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPrescriptionsByUser = getPrescriptionsByUser;
const addFamilyMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        // Assuming you have a route parameter for the patient's ID
        const familyMemberData = req.body; // Assuming family member data is sent in the request body
        // Find the patient by ID
        const patient = yield patientModel_2.default.findOne({ username });
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
            healthPackageSubscription: []
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
        // Find the patient by ID
        const patient = yield patientModel_2.default.findOne({ username });
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
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const doctorModel_2 = __importDefault(require("../models/doctorModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const viewHealthPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all health packages from the database
        const healthPackages = yield packageModel_1.default.find();
        if (healthPackages.length === 0) {
            return res.status(404).json({ message: 'No health packages found' });
        }
        // Return the health packages to the patient
        res.status(200).json({ healthPackages });
    }
    catch (error) {
        console.error('Error fetching health packages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewHealthPackages = viewHealthPackages;
const viewHealthPackageDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageName = req.params.name; // Assuming the package name is passed as a route parameter
        // Find the health package by its name
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ message: 'Health package not found' });
        }
        // Return the health package details to the patient
        res.status(200).json({ healthPackage });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});
exports.viewHealthPackageDetails = viewHealthPackageDetails;
// export const viewDoctorAppointments = async (req: Request, res: Response) => {
//   const doctorUsername = req.query.doctorUsername; // Assuming the parameter is in the route
//   try {
//       const doctor: IDoctor | null = await doctorModel.findOne({ username: doctorUsername }).exec();
//       if (doctor) {
//           // Retrieve the doctor's timeslots (available appointments)
//           const doctorAppointments = doctor.timeslots; // or any other property you've defined for appointments
//           res.status(200).json(doctorAppointments);
//       } else {
//           res.status(404).json({ message: 'Doctor not found yasara elkalbb' });
//       }
//   } catch (error) {
//       res.status(500).json({ message: 'An error occurred', error });
//   }
// };
const viewDoctorAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.query.doctorId; // Assuming the parameter is in the route
    try {
        const doctor = yield doctorModel_2.default.findById(doctorId).exec();
        if (doctor) {
            // Retrieve the doctor's timeslots (available appointments)
            const doctorAppointments = doctor.timeslots; // or any other property you've defined for appointments
            res.status(200).json(doctorAppointments);
        }
        else {
            res.status(404).json({ message: 'Doctor not found yasara elkalbb' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});
exports.viewDoctorAppointments = viewDoctorAppointments;
// export const viewHealthPackageDetails = async (req: Request, res: Response) => {
//   try {
//     const packageName = req.params.name; // Assuming the package name is passed as a route parameter
//     // Find the health package by its name
//     const healthPackage = await packageModel.findOne({ name: packageName });
//     if (!healthPackage) {
//       return res.status(404).json({ message: 'Health package not found' });
//     }
//     // Return the health package details to the patient
//     res.status(200).json({ healthPackage });
//   } catch (error) {
//     console.error('Error fetching health package details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// APPOINTMENTS 
//VIEW ALL MY APPOINTMENTS
const getPatientAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("im in");
    try {
        const patientUsername = req.query.patientUsername; // Extract username from route parameters
        const dateString = req.query.date; // Assert the type as string
        const status = req.query.status;
        const filters = { patient: patientUsername };
        if (dateString) {
            // Parse the date string into a JavaScript Date object
            const dateParts = dateString.split('_');
            if (dateParts.length === 3) {
                const year = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
                const day = parseInt(dateParts[2], 10);
                const dateObject = new Date(year, month, day);
                // Filter appointments that match the provided date
                filters.date = dateObject;
            }
        }
        if (status) {
            filters.status = status;
        }
        const appointments = yield appointmentModel_2.default.find(filters).exec();
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPatientAppointments = getPatientAppointments;
//VIEW PAST APPOINTMENTS
const viewPastAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = yield appointmentModel_2.default.find({ patient: patientUsername, status: { $in: ['cancelled', 'completed', 'rescheduled'] } });
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
//VIEW UPCOMING APPOINTMENTS
const viewUpcomingAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = yield appointmentModel_2.default.find({ patient: patientUsername, status: 'upcoming' });
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
// FILTER APPOINTMENTS BY DATE 
const getAppointmentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
    const appointments = yield appointmentModel_2.default.find({ patient: patientUsername, date: date }).exec();
    res.status(200).json({ appointments });
});
exports.getAppointmentByDate = getAppointmentByDate;
//FILTER APPOINTMENTS BY STATUS
const getAppointmentByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const status = req.query.status;
    const appointments = yield appointmentModel_2.default.find({ patient: patientUsername, status: status }).exec();
    res.status(200).json({ appointments });
});
exports.getAppointmentByStatus = getAppointmentByStatus;
//HEALTH RECORD 
//VIEW MY HEALTH RECORD (ONE AND ONLY)
const viewMyHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientUsername = req.query.patientUsername;
        const healthRecord = yield healthRecordModel_1.default.find({ patient: patientUsername });
        if (!healthRecord) {
            return res.status(404).json({ message: 'You Have No healthRecord Yet!' });
        }
        res.status(200).json({ healthRecord });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewMyHealthRecord = viewMyHealthRecord;
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
    const token = jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    return token;
};
exports.createToken = createToken;
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
            const patient = yield patientModel_1.default.findOne({ username: tokenDB.username });
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, patient.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            // Validate the new password using the validatePassword function
            if (!validatePassword(newPassword)) {
                return res.status(400).json({ message: 'Invalid new password' });
            }
            // Hash and update the new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            patient.password = hashedNewPassword;
            yield patient.save();
            return res.status(200).json({ message: 'Password changed successfully' });
        }));
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
const verifyTokenPatient = (req, res, next) => {
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
            if (tokenDB.role === 'patient') {
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
exports.verifyTokenPatient = verifyTokenPatient;
const calculateAge = (birthdate) => {
    const currentDate = new Date();
    const birthYear = birthdate.getFullYear();
    const currentYear = currentDate.getFullYear();
    let age = currentYear - birthYear;
    // Adjust age if birthday hasn't occurred yet this year
    const birthMonth = birthdate.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthDay = birthdate.getDate();
    const currentDay = currentDate.getDate();
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }
    return age;
};
// Example usage
const birthdate = new Date('1990-05-15');
const age = calculateAge(birthdate);
console.log(age); // Output: 32 (assuming current date is after May 15th)
// export const linkFamilyMember = async (req: Request, res: Response) => {
//   try {
//     const { patientUsername } = req.query;
//     const familyMemberData = req.body.familyMemberData;
//     const relation=req.body.relation;
//     // Validate inputs
//     if (!patientUsername || !familyMemberData) {
//       return res.status(400).json({ message: 'Invalid input data' });
//     }
//     // Find the patient by username
//     const patient = await Patientmodel.findOne({ username: patientUsername });
//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
//     const familyMember = await Patientmodel.findOne({ email: familyMemberData });
//     if (!familyMember) {
//       return res.status(404).json({ message: 'Family member not found' });
//     }
//     const healthPackageSubscription =
//     familyMember.healthPackageSubscription && familyMember.healthPackageSubscription[0]
//       ? familyMember.healthPackageSubscription[0]
//       : "default_subscription";
// const age=calculateAge(familyMember.dateofbirth);
//     // Add the new family member object to the patient's record
//     patient.familyMembers.push({
//       name: familyMember.name,
//       nationalId: " ",
//       age:age ,
//       gender: " ljkhj ",
//       relationToPatient: relation,
//  healthPackageSubscription:familyMember.healthPackageSubscription
//     });
//     await patient.save();
//     res.status(200).json({ success: true, message: 'Family member linked successfully', patient });
//   } catch (error) {
//     console.error('Error linking family member:', error);
//     res.status(500).json({ success: false, message: 'An error occurred' });
//   }
// };
const linkFamilyMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientUsername } = req.query;
        const familyMemberData = req.body.familyMemberData;
        const relation = req.body.relation;
        // Validate inputs
        if (!patientUsername || !familyMemberData) {
            return res.status(400).json({ message: 'Invalid input data' });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        let familyMember;
        // Check if familyMemberData is a string (email) or a number (mobile number)
        if (typeof familyMemberData === 'string') {
            // Find the family member by email
            familyMember = yield patientModel_1.default.findOne({ email: familyMemberData });
        }
        else if (typeof familyMemberData === 'number') {
            // Find the family member by mobile number
            familyMember = yield patientModel_1.default.findOne({ mobilenumber: familyMemberData });
        }
        if (!familyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }
        const healthPackageSubscription = familyMember.healthPackageSubscription && familyMember.healthPackageSubscription[0]
            ? familyMember.healthPackageSubscription[0]
            : 'default_subscription';
        const age = calculateAge(familyMember.dateofbirth);
        // Add the new family member object to the patient's record
        patient.familyMembers.push({
            name: familyMember.name,
            nationalId: ' ',
            age: age,
            gender: ' ljkhj ',
            relationToPatient: relation,
            healthPackageSubscription: familyMember.healthPackageSubscription,
        });
        yield patient.save();
        res.status(200).json({ success: true, message: 'Family member linked successfully', patient });
    }
    catch (error) {
        console.error('Error linking family member:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});
exports.linkFamilyMember = linkFamilyMember;
// ...
// Endpoint to link family members
// export const linkFamilyMember = async (req: Request, res: Response) => {
//   try {
//     const { patientUsername } = req.query;
//     const familyMemberData = req.body;
//     const relation=req.body;
//     // Validate inputs
//     if (!patientUsername || !familyMemberData) {
//       return res.status(400).json({ message: 'Invalid input data' });
//     }
//     // // Check if familyMemberData is a string or a number
//     // const isString = typeof familyMemberData === 'string';
//     // const isNumber = typeof familyMemberData === 'number' || !isNaN(Number(familyMemberData));
//     if (isString) {
//       // If it's a string, assume it's the email
//       // Find the family member by email
//       const familyMember = await patientModel.findOne({ email: familyMemberData });
//       if (!familyMember) {
//         return res.status(404).json({ message: 'Family member not found' });
//       }
//       // Find the patient by username
//       const patient = await patientModel.findOne({ username: patientUsername });
//       if (!patient) {
//         return res.status(404).json({ message: 'Patient not found' });
//       }
//       const age=calculateAge(familyMember.dateofbirth);
//       // Add the new family member object to the patient's record
//       patient.familyMembers.push({
//         name: familyMember.name,
//         nationalId: "",
//         age: age,
//         gender: "",
//         relationToPatient: relation,
//         healthPackageSubscription: familyMember.healthPackageSubscription,
//       });
//       await patient.save();
//       res.status(200).json({ success: true, message: 'Family member linked successfully', patient });
//     }
//      else if (isNumber) {
//       // If it's a number, assume it's the mobilenumber
//       const phoneNumber = Number(familyMemberData);
//       // Find the family member by mobilenumber
//       const familyMember = await patientModel.findOne({ mobilenumber: phoneNumber });
//       if (!familyMember) {
//         return res.status(404).json({ message: 'Family member not found' });
//       }
//       // Find the patient by username
//       const patient = await patientModel.findOne({ username: patientUsername });
//       if (!patient) {
//         return res.status(404).json({ message: 'Patient not found' });
//       }
//       const age=calculateAge(familyMember.dateofbirth);
//       // Add the new family member object to the patient's record
//       patient.familyMembers.push({
//         name: familyMember.name,
//         nationalId: "",
//         age: age,
//         gender: "",
//         relationToPatient: relation,
//         healthPackageSubscription: familyMember.healthPackageSubscription,
//       });
//       await patient.save();
//       res.status(200).json({ success: true, message: 'Family member linked successfully', patient });
//     } else {
//       return res.status(400).json({ message: 'Invalid family member data' });
//     }
//   } catch (error) {
//     console.error('Error linking family member:', error);
//     res.status(500).json({ success: false, message: 'An error occurred' });
//   }
// };
