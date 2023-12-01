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
exports.sendRequestFollowUp = exports.getTodayAppointments = exports.viewFamAppointments = exports.rescheduleAppointments = exports.deletePatientDocs = exports.openPatientDocument = exports.uploadPatintDocs = exports.viewWalletAmount = exports.linkFamilyMember = exports.verifyTokenPatient = exports.changePassword = exports.logout = exports.createToken = exports.viewMyHealthRecord = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewUpcomingAppointments = exports.viewPastAppointments = exports.getPatientAppointments = exports.viewDoctorAppointments = exports.viewHealthPackageDetails = exports.viewHealthPackages = exports.selectDoctors = exports.searchDoctors = exports.getDoctorDetails = exports.filterDoctors = exports.getDoctor = exports.getSessionPrice = exports.viewFamilyMembers = exports.addFamilyMember = exports.getPrescriptionsByUser = exports.getPatients = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const packageModel_1 = __importDefault(require("../models/packageModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const requestModel_1 = __importDefault(require("../models/requestModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appointmentController_1 = require("./appointmentController");
// create a new workout
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request reached controller");
    try {
        const { username, name, email, password, dateofbirth, mobilenumber, emergencyContact, healthPackageSubscription, gender, } = req.body;
        const emailExists = yield patientModel_1.default.findOne({ email });
        const emailExists2 = yield doctorModel_2.default.findOne({ email });
        const emailExists3 = yield adminModel_1.default.findOne({ email });
        const usernameExists = yield patientModel_1.default.findOne({ username });
        const usernameExists2 = yield doctorModel_2.default.findOne({ username });
        const usernameExists3 = yield adminModel_1.default.findOne({ username });
        if (emailExists) {
            return res.status(401).json({ message: "email exists" });
        }
        if (emailExists2) {
            return res.status(401).json({ message: "email exists" });
        }
        if (emailExists3) {
            return res.status(401).json({ message: "email exists" });
        }
        if (usernameExists) {
            return res.status(401).json({ message: "username exists" });
        }
        if (usernameExists2) {
            return res.status(401).json({ message: "username exists" });
        }
        if (usernameExists3) {
            return res.status(401).json({ message: "username exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const patient = yield patientModel_1.default.create({
            username,
            name,
            email,
            password: hash,
            dateofbirth,
            mobilenumber,
            emergencyContact,
            healthPackageSubscription,
            gender,
        });
        console.log("Patient created!", patient);
        res.status(200).json(patient);
    }
    catch (error) {
        const err = error;
        console.log("Error creating patient");
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
            const dateParts = dateString.split("_");
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
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getPrescriptionsByUser = getPrescriptionsByUser;
const addFamilyMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        // Assuming you have a route parameter for the patient's ID
        const familyMemberData = req.body; // Assuming family member data is sent in the request body
        // Find the patient by ID
        const patient = yield patientModel_2.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        const user = familyMemberData.name + "" + "xx";
        const email = familyMemberData.name + "" + "xx" + "@gmail.com";
        // Create a new patient
        const newPatientData = {
            username: user,
            name: familyMemberData.name,
            email: email,
            password: "Helloworld2",
            dateofbirth: "2002-10-10",
            mobilenumber: "01152050450",
            emergencyContact: "Hadwa pasha",
            healthPackageSubscription: [],
            familyMembers: [],
            walletBalance: 2000,
            gender: familyMemberData.gender,
            // Add other required attributes here
        };
        // Create the new patient
        const newPatient = yield patientModel_2.default.create(newPatientData);
        // Add the new family member object to the patient's record
        patient.familyMembers.push({
            name: familyMemberData.name,
            username: user,
            nationalId: familyMemberData.nationalId,
            age: familyMemberData.age,
            gender: familyMemberData.gender,
            relationToPatient: familyMemberData.relationToPatient,
            healthPackageSubscription: [],
        });
        yield patient.save();
        return res.status(201).json({
            message: "Family member added successfully",
            patient,
            newPatient,
        });
    }
    catch (error) {
        console.error("Error adding family member:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.addFamilyMember = addFamilyMember;
//view family members
const viewFamilyMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        // Find the patient by ID
        const patient = yield patientModel_2.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        // Return the family members array
        return res.status(200).json({ familyMembers: patient.familyMembers });
    }
    catch (error) {
        console.error("Error viewing family members:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.viewFamilyMembers = viewFamilyMembers;
const getSessionPrice = (req, res, username) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getSessionPrice = getSessionPrice;
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctorModel_1.default.find({}, "name speciality hourlyRate");
        const doctorsWithSessionPrice = [];
        for (const doctor of doctors) {
            const sessionPrice = 130 + 0.1 - 0.5;
            const doctorWithSessionPrice = Object.assign(Object.assign({}, doctor.toObject()), { sessionPrice });
            doctorsWithSessionPrice.push(doctorWithSessionPrice);
        }
        res.status(200).json(doctorsWithSessionPrice);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
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
        const appointments = yield appointmentModel_1.default.find({
            date: date,
            doctor: doctor.username,
        });
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
            res.status(404).json({ error: "Doctor not found" });
            return;
        }
        res.status(200).json(doctor);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while retrieving doctor details" });
    }
});
exports.getDoctorDetails = getDoctorDetails;
const searchDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, speciality } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }
        if (speciality) {
            query.speciality = { $regex: new RegExp(speciality, "i") };
        }
        const doctors = yield doctorModel_1.default.find(query);
        if (doctors.length === 0) {
            res.status(404).json({ error: "No doctors found" });
            return;
        }
        res.status(200).json(doctors);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while searching for doctors" });
    }
});
exports.searchDoctors = searchDoctors;
const selectDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const doctor = yield doctorModel_2.default.findOne({ username });
        if (!doctor) {
            res.status(404).json({ error: "Doctor not found" });
            return;
        }
        // Handle the logic for selecting the doctor.
        // Example: Update the doctor's status or perform any other actions.
        res.status(200).json(doctor);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while selecting the doctor" });
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
            return res.status(404).json({ message: "No health packages found" });
        }
        // Return the health packages to the patient
        res.status(200).json({ healthPackages });
    }
    catch (error) {
        console.error("Error fetching health packages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.viewHealthPackages = viewHealthPackages;
const viewHealthPackageDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageName = req.params.name; // Assuming the package name is passed as a route parameter
        // Find the health package by its name
        const healthPackage = yield packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ message: "Health package not found" });
        }
        // Return the health package details to the patient
        res.status(200).json({ healthPackage });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
});
exports.viewHealthPackageDetails = viewHealthPackageDetails;
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
            res.status(404).json({ message: "Doctor not found yasara elkalbb" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
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
        // const patientUsername = req.query.patientUsername; // Extract username from route parameters
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        console.log(token);
        const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        const dateString = req.query.date; // Assert the type as string
        const status = req.query.status;
        const filters = { patient: patientUsername };
        if (dateString) {
            // Parse the date string into a JavaScript Date object
            const dateParts = dateString.split("_");
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
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getPatientAppointments = getPatientAppointments;
//VIEW PAST APPOINTMENTS
const viewPastAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = yield appointmentModel_2.default.find({
            patient: patientUsername,
            status: { $in: ["cancelled", "completed", "rescheduled"] },
        });
        if (!appointments) {
            return res
                .status(404)
                .json({ message: "You Have No Past Appointments Yet!" });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.viewPastAppointments = viewPastAppointments;
//VIEW UPCOMING APPOINTMENTS
const viewUpcomingAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = yield appointmentModel_2.default.find({
            patient: patientUsername,
            status: "upcoming",
        });
        if (!appointments) {
            return res
                .status(404)
                .json({ message: "You Have No Upcoming Appointments Yet!" });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.viewUpcomingAppointments = viewUpcomingAppointments;
// FILTER APPOINTMENTS BY DATE
const getAppointmentByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
    const appointments = yield appointmentModel_2.default.find({
        patient: patientUsername,
        date: date,
    }).exec();
    res.status(200).json({ appointments });
});
exports.getAppointmentByDate = getAppointmentByDate;
//FILTER APPOINTMENTS BY STATUS
const getAppointmentByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientUsername = req.query.patientUsername;
    const status = req.query.status;
    const appointments = yield appointmentModel_2.default.find({
        patient: patientUsername,
        status: status,
    }).exec();
    res.status(200).json({ appointments });
});
exports.getAppointmentByStatus = getAppointmentByStatus;
//HEALTH RECORD
//VIEW MY HEALTH RECORD (ONE AND ONLY)
const viewMyHealthRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    console.log(tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username);
    const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    try {
        const healthRecord = yield healthRecordModel_1.default.findOne({
            patient: patientUsername,
        });
        if (!healthRecord) {
            return res.status(404).json({ message: "You Have No healthRecord Yet!" });
        }
        res.status(200).json({ healthRecord });
        console.log(healthRecord);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
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
        throw new Error("SECRET_ACCESS_TOKEN is not defined in the environment.");
    }
    const token = jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
    });
    return token;
};
exports.createToken = createToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("SECRET_ACCESS_TOKEN is not defined in the environment.");
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: "Token is not valid" });
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
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("SECRET_ACCESS_TOKEN is not defined in the environment.");
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: "Token is not valid" });
            }
            const tokenDB = yield tokenModel_1.default.findOne({ token });
            if (!tokenDB) {
                return res.status(404).json({ message: "Token not found" });
            }
            const patient = yield patientModel_1.default.findOne({
                username: tokenDB.username,
            });
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, patient.password);
            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ message: "Current password is incorrect" });
            }
            // Validate the new password using the validatePassword function
            if (!validatePassword(newPassword)) {
                return res.status(400).json({ message: "Invalid new password" });
            }
            // Hash and update the new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            patient.password = hashedNewPassword;
            yield patient.save();
            return res
                .status(200)
                .json({ message: "Password changed successfully" });
        }));
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.changePassword = changePassword;
const verifyTokenPatient = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("SECRET_ACCESS_TOKEN is not defined in the environment.");
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (tokenDB) {
            if (tokenDB.role === "patient") {
                next();
            }
            else {
                return res.status(403).json({ message: "Token is not authorized" });
            }
        }
        else {
            return res.status(403).json({ message: "Token is not valid 2" });
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
    if (currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }
    return age;
};
// Example usage
const birthdate = new Date("1990-05-15");
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
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        var patientUsername;
        console.log(tokenDB);
        if (tokenDB) {
            patientUsername = tokenDB.username;
        }
        const familyMemberData = req.body.familyMemberData;
        const relation = req.body.relation;
        //const flag = req.body.isMobileNumber;
        // Validate inputs
        if (!patientUsername || !familyMemberData) {
            console.log(patientUsername);
            console.log(familyMemberData);
            return res.status(400).json({ message: "Invalid input data" });
        }
        // Find the patient by username
        const patient = yield patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        let familyMember;
        if (familyMemberData.startsWith("01")) {
            familyMember = yield patientModel_1.default.findOne({
                mobilenumber: familyMemberData,
            });
        }
        else {
            familyMember = yield patientModel_1.default.findOne({ email: familyMemberData });
        }
        if (!familyMember) {
            return res.status(404).json({ message: "Family member not found" });
        }
        const healthPackageSubscription = familyMember.healthPackageSubscription &&
            familyMember.healthPackageSubscription[0]
            ? familyMember.healthPackageSubscription[0]
            : "default_subscription";
        const age = calculateAge(familyMember.dateofbirth);
        // Add the new family member object to the patient's record
        patient.familyMembers.push({
            name: familyMember.name,
            username: familyMember.username,
            nationalId: "0197854612301457",
            age: age,
            gender: familyMember.gender,
            relationToPatient: relation,
            healthPackageSubscription: familyMember.healthPackageSubscription,
        });
        yield patient.save();
        res.status(200).json({
            success: true,
            message: "Family member linked successfully",
            patient,
        });
    }
    catch (error) {
        console.error("Error linking family member:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});
exports.linkFamilyMember = linkFamilyMember;
const viewWalletAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const patient = yield patientModel_2.default.findOne({ username }).exec();
        if (!patient) {
            return res.status(404).json({ error: "Patient not found." });
        }
        const walletAmount = patient.walletBalance;
        if (walletAmount === undefined) {
            return res.status(500).json({ error: "Wallet balance not available." });
        }
        res.json({ walletAmount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.viewWalletAmount = viewWalletAmount;
const uploadPatintDocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const uploadedFiles = req.files;
        console.log(uploadedFiles);
        if (uploadedFiles) {
            const file = uploadedFiles[0];
            const path = file.filename;
            console.log(path);
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            const tokenDB = yield tokenModel_1.default.findOne({ token: token });
            var username;
            if (tokenDB) {
                username = tokenDB.username;
            }
            else {
                return res.status(404).json({ error: "username not found" });
            }
            const healthRecord = yield healthRecordModel_1.default.findOne({
                patient: username,
            });
            const { section, subsection } = req.query;
            console.log(section);
            if (!healthRecord) {
                return res.status(404).json({
                    message: "Health record not found for the specified patient.",
                });
            }
            console.log(healthRecord);
            if (section == "MedicationList" && subsection == "CurrentMedications") {
                (_b = (_a = healthRecord.MedicationList) === null || _a === void 0 ? void 0 : _a.CurrentMedications) === null || _b === void 0 ? void 0 : _b.Prescriptions.push(path);
            }
            else if (section == "MedicationList" &&
                subsection == "PastMedications") {
                (_d = (_c = healthRecord.MedicationList) === null || _c === void 0 ? void 0 : _c.PastMedications) === null || _d === void 0 ? void 0 : _d.Prescriptions.push(path);
            }
            else if (section == "Laboratory" && subsection == "BloodTests") {
                (_e = healthRecord.Laboratory) === null || _e === void 0 ? void 0 : _e.BloodTests.push(path);
            }
            else if (section == "Laboratory" && subsection == "XRays") {
                (_f = healthRecord.Laboratory) === null || _f === void 0 ? void 0 : _f.XRays.push(path);
            }
            else if (section == "Laboratory" && subsection == "Other") {
                (_g = healthRecord.Laboratory) === null || _g === void 0 ? void 0 : _g.Other.push(path);
            }
            else if (section == "GeneralImages") {
                console.log("heyy");
                (_h = healthRecord.GeneralImages) === null || _h === void 0 ? void 0 : _h.push(path);
            }
            console.log(healthRecord);
            yield healthRecord.save();
            res.json({ message: "Documents uploaded successfully." });
        }
    }
    catch (error) {
        console.error("Error handling file upload:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.uploadPatintDocs = uploadPatintDocs;
const openPatientDocument = (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path_1.default.join(__dirname, "../uploadsPatient", filename);
        const fileStream = fs_1.default.createReadStream(filePath);
        fileStream.on("open", () => {
            res.set("Content-Type", "application/octet-stream");
            fileStream.pipe(res);
        });
        fileStream.on("error", (error) => {
            console.error("Error serving pharmacist document:", error);
            res.status(500).json({ error: "Internal server error." });
        });
    }
    catch (error) {
        console.error("Error serving pharmacist document:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.openPatientDocument = openPatientDocument;
const deletePatientDocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const healthRecord = yield healthRecordModel_1.default.findOne({ patient: username });
        const { section, subsection } = req.query;
        const { path } = req.body;
        if (!healthRecord) {
            return res.status(404).json({
                message: "Health record not found for the specified patient.",
            });
        }
        console.log(healthRecord);
        if (section == "MedicationList" && subsection == "CurrentMedications") {
            if ((_j = healthRecord.MedicationList) === null || _j === void 0 ? void 0 : _j.CurrentMedications) {
                const updatedPrescriptions = (_l = (_k = healthRecord.MedicationList) === null || _k === void 0 ? void 0 : _k.CurrentMedications) === null || _l === void 0 ? void 0 : _l.Prescriptions.filter((prescription) => prescription !== path);
                if (updatedPrescriptions !== undefined) {
                    healthRecord.MedicationList.CurrentMedications.Prescriptions =
                        updatedPrescriptions;
                }
            }
        }
        else if (section == "MedicationList" && subsection == "PastMedications") {
            if ((_m = healthRecord.MedicationList) === null || _m === void 0 ? void 0 : _m.PastMedications) {
                const updatedPrescriptions = (_p = (_o = healthRecord.MedicationList) === null || _o === void 0 ? void 0 : _o.PastMedications) === null || _p === void 0 ? void 0 : _p.Prescriptions.filter((prescription) => prescription !== path);
                if (updatedPrescriptions !== undefined) {
                    healthRecord.MedicationList.PastMedications.Prescriptions =
                        updatedPrescriptions;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "BloodTests") {
            if ((_q = healthRecord.Laboratory) === null || _q === void 0 ? void 0 : _q.BloodTests) {
                const updated = (_s = (_r = healthRecord.Laboratory) === null || _r === void 0 ? void 0 : _r.BloodTests) === null || _s === void 0 ? void 0 : _s.filter((prescription) => prescription !== path);
                if (updated !== undefined) {
                    healthRecord.Laboratory.BloodTests = updated;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "XRays") {
            if ((_t = healthRecord.Laboratory) === null || _t === void 0 ? void 0 : _t.XRays) {
                const updated = (_v = (_u = healthRecord.Laboratory) === null || _u === void 0 ? void 0 : _u.XRays) === null || _v === void 0 ? void 0 : _v.filter((prescription) => prescription !== path);
                if (updated !== undefined) {
                    healthRecord.Laboratory.XRays = updated;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "Other") {
            if ((_w = healthRecord.Laboratory) === null || _w === void 0 ? void 0 : _w.Other) {
                const updated = (_y = (_x = healthRecord.Laboratory) === null || _x === void 0 ? void 0 : _x.Other) === null || _y === void 0 ? void 0 : _y.filter((prescription) => prescription !== path);
                if (updated !== undefined) {
                    healthRecord.Laboratory.Other = updated;
                }
            }
        }
        else if (section == "GeneralImages") {
            console.log("heyy");
            if (healthRecord.GeneralImages) {
                const updatedPrescriptions = healthRecord.GeneralImages.filter((prescription) => prescription !== path);
                if (updatedPrescriptions !== undefined) {
                    healthRecord.GeneralImages = updatedPrescriptions;
                }
            }
        }
        yield healthRecord.save();
        res.json({ message: "Document removed successfully." });
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.deletePatientDocs = deletePatientDocs;
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
            return res.status(404).json({ error: "username not found" });
        }
        const { appointmentId, date } = req.body;
        const newDate = new Date(date);
        var notificationText = "";
        var notificationSubject = "";
        const appointment = yield appointmentModel_1.default.findById(appointmentId);
        if (appointment) {
            const updatedAppointment = yield appointmentModel_2.default.create({
                status: "rescheduled",
                doctor: appointment.doctor,
                patient: appointment.patient,
                date: newDate,
                scheduledBy: username,
            });
            const doctor = yield doctorModel_2.default.findOne({
                username: appointment.doctor,
            });
            if (doctor) {
                doctor.timeslots.push({ date: appointment.date });
                // await doctor.save();
                doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date && timeslot.date.getTime() !== newDate.getTime());
                notificationText = `Your appointment has been rescheduled for ${new Date(date)}. 
                      Doctor: ${doctor.username}`;
                yield doctor.save();
                appointment.status = "cancelled";
                const updatedAppointment = yield appointment.save();
                res.status(200).json({ updatedAppointment });
            }
            //Send Notificationss(system & mail)
            notificationSubject = "Appointment Rescheduled Successfully";
            if (username != appointment.patient) {
                //send notification to username and appointment.patient
                (0, appointmentController_1.createNotificationWithCurrentDate)(username, notificationSubject, notificationText);
                (0, appointmentController_1.createNotificationWithCurrentDate)(appointment.patient, notificationSubject, notificationText);
            }
            else {
                //send notification to username
                (0, appointmentController_1.createNotificationWithCurrentDate)(username, notificationSubject, notificationText);
            }
        }
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.rescheduleAppointments = rescheduleAppointments;
const viewFamAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const patient = yield patientModel_2.default.findOne({ username: username }).lean();
        if (patient) {
            const familyMembers = patient.familyMembers;
            const familyMemberUsernames = familyMembers.map((member) => member.username);
            const appointments = yield appointmentModel_1.default.find({
                patient: { $in: familyMemberUsernames },
            });
            // Filter appointments where scheduledBy is equal to username
            const famMemApps = appointments.filter((appointment) => appointment.scheduledBy === username);
            res.status(200).json({ appointments: famMemApps });
        }
        else {
            return res.status(404).json({ error: "patient not found" });
        }
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.viewFamAppointments = viewFamAppointments;
const getTodayAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tokenDB = yield tokenModel_1.default.findOne({ token });
    console.log(token);
    const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day
    const appointments = yield appointmentModel_1.default
        .find({
        patient: patientUsername,
        date: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        }, // Filter for today's appointments
    })
        .exec();
    res.status(200).json(appointments);
});
exports.getTodayAppointments = getTodayAppointments;
//send Request Follow up to doctor
const sendRequestFollowUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const { Appointmentstatus, doctor, patient, AppointmentDate, type, price, paid, scheduledBy, followUpDate } = req.body;
        const followUpRequest = yield requestModel_1.default.create({
            Appointmentstatus: Appointmentstatus,
            doctor: doctor,
            patient: patient,
            AppointmentDate: AppointmentDate,
            type: type,
            price: price,
            paid: paid,
            scheduledBy: scheduledBy,
            status: "pending",
            followUpDate: followUpDate,
            requestedBy: username,
        });
        res.status(200).json({ followUpRequest });
        //follow up in doctor
        //el ana 3amlaha follow up schedBy me
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.sendRequestFollowUp = sendRequestFollowUp;
