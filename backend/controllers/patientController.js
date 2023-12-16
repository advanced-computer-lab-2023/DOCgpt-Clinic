"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcPatientAge = exports.sendRequestFollowUp = exports.getTodayAppointments = exports.viewFamAppointments = exports.rescheduleAppointments = exports.deletePatientDocs = exports.openPatientDocument = exports.uploadPatintDocs = exports.viewWalletAmount = exports.linkFamilyMember = exports.verifyTokenPatient = exports.changePassword = exports.logout = exports.createToken = exports.viewMyHealthRecord = exports.getAppointmentByStatus = exports.getAppointmentByDate = exports.viewUpcomingAppointments = exports.viewPastAppointments = exports.getPatientDocNames = exports.getPatientAppointments = exports.viewDoctorAppointments = exports.viewHealthPackageDetails = exports.viewHealthPackages = exports.selectDoctors = exports.searchDoctors = exports.getDoctorDetails = exports.filterDoctors = exports.getDoctor = exports.getSessionPrice = exports.viewFamilyMembers = exports.addFamilyMember = exports.getPrescriptionsByUser = exports.getPatient = exports.getPatients = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../models/patientModel"));
const packageModel_1 = __importDefault(require("../models/packageModel"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const requestModel_1 = __importDefault(require("../models/requestModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appointmentController_1 = require("./appointmentController");
const axios_1 = __importDefault(require("axios"));
// create a new workout
const createPatient = async (req, res) => {
    console.log("Request reached controller");
    try {
        const { username, name, email, password, dateofbirth, mobilenumber, emergencyContact, healthPackageSubscription, gender, deliveryAddress } = req.body;
        const emailExists = await patientModel_1.default.findOne({ email });
        const emailExists2 = await doctorModel_2.default.findOne({ email });
        const emailExists3 = await adminModel_1.default.findOne({ email });
        const usernameExists = await patientModel_1.default.findOne({ username });
        const usernameExists2 = await doctorModel_2.default.findOne({ username });
        const usernameExists3 = await adminModel_1.default.findOne({ username });
        if (emailExists) {
            return res.status(401).json({ message: 'email exists' });
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
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const patient = await patientModel_1.default.create({ username, name, email, password: hash, dateofbirth, mobilenumber, emergencyContact, healthPackageSubscription, gender, deliveryAddress,
            carts: [],
            orders: [], });
        console.log("i reached");
        const idResponse = await axios_1.default.post('http://localhost:3000/api/cart/createCart', {
            username
        });
        console.log(idResponse.data);
        patient.carts.push(idResponse.data.id);
        await patient.save();
        console.log('Patient created!', patient);
        res.status(200).json(patient);
    }
    catch (error) {
        const err = error;
        console.log("Error creating patient");
        res.status(505).json({ error: err.message });
    }
};
exports.createPatient = createPatient;
// get all workouts
const getPatients = async (req, res) => {
    const Patients = await patientModel_1.default.find({}).sort({ createdAt: -1 });
    res.status(200).json(Patients);
};
exports.getPatients = getPatients;
const getPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    res.status(200).json(patient);
});
exports.getPatient = getPatient;
const perscriptionModel_1 = __importDefault(require("../models/perscriptionModel"));
const patientModel_2 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const getPrescriptionsByUser = async (req, res) => {
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
        const prescriptions = await perscriptionModel_1.default.find(filters).exec();
        res.status(200).json(prescriptions);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPrescriptionsByUser = getPrescriptionsByUser;
const addFamilyMember = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
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
        const patient = await patientModel_2.default.findOne({ username });
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
        const newPatient = await patientModel_2.default.create(newPatientData);
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
        await patient.save();
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
};
exports.addFamilyMember = addFamilyMember;
//view family members
const viewFamilyMembers = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        // Find the patient by ID
        const patient = await patientModel_2.default.findOne({ username });
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
};
exports.viewFamilyMembers = viewFamilyMembers;
const getSessionPrice = async (req, res, username) => { };
exports.getSessionPrice = getSessionPrice;
const getDoctor = async (req, res) => {
    try {
        const doctors = await doctorModel_1.default.find({}, "name speciality hourlyRate");
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
};
exports.getDoctor = getDoctor;
const filterDoctors = async (req, res) => {
    const speciality = req.query.speciality;
    let doctors = [];
    const date = req.query.date;
    if (speciality) {
        doctors = await doctorModel_1.default.find({ speciality: speciality }).exec();
    }
    else {
        doctors = await doctorModel_1.default.find();
    }
    const resultDoctors = [];
    for (const doctor of doctors) {
        const appointments = await appointmentModel_1.default.find({
            date: date,
            doctor: doctor.username,
        });
        if (appointments.length === 0) {
            resultDoctors.push(doctor);
        }
    }
    res.status(200).json(resultDoctors);
};
exports.filterDoctors = filterDoctors;
const getDoctorDetails = async (req, res) => {
    try {
        const { _id } = req.query;
        const doctor = await doctorModel_1.default.findById(_id);
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
};
exports.getDoctorDetails = getDoctorDetails;
const searchDoctors = async (req, res) => {
    try {
        const { name, speciality } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }
        if (speciality) {
            query.speciality = { $regex: new RegExp(speciality, "i") };
        }
        const doctors = await doctorModel_1.default.find(query);
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
};
exports.searchDoctors = searchDoctors;
const selectDoctors = async (req, res) => {
    try {
        const { username } = req.query;
        const doctor = await doctorModel_2.default.findOne({ username });
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
};
exports.selectDoctors = selectDoctors;
const appointmentModel_2 = __importDefault(require("../models/appointmentModel"));
const healthRecordModel_1 = __importDefault(require("../models/healthRecordModel"));
const doctorModel_2 = __importDefault(require("../models/doctorModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const viewHealthPackages = async (req, res) => {
    try {
        // Retrieve all health packages from the database
        const healthPackages = await packageModel_1.default.find();
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
};
exports.viewHealthPackages = viewHealthPackages;
const viewHealthPackageDetails = async (req, res) => {
    try {
        const packageName = req.params.name; // Assuming the package name is passed as a route parameter
        // Find the health package by its name
        const healthPackage = await packageModel_1.default.findOne({ name: packageName });
        if (!healthPackage) {
            return res.status(404).json({ message: "Health package not found" });
        }
        // Return the health package details to the patient
        res.status(200).json({ healthPackage });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
exports.viewHealthPackageDetails = viewHealthPackageDetails;
const viewDoctorAppointments = async (req, res) => {
    const doctorId = req.query.doctorId; // Assuming the parameter is in the route
    try {
        const doctor = await doctorModel_2.default.findById(doctorId).exec();
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
};
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
const getPatientAppointments = async (req, res) => {
    console.log("im in");
    try {
        // const patientUsername = req.query.patientUsername; // Extract username from route parameters
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
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
        const appointments = await appointmentModel_2.default.find(filters).exec();
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPatientAppointments = getPatientAppointments;
const getPatientDocNames = async (req, res) => {
    console.log("im in");
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        console.log(token);
        const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
        const appointments = await appointmentModel_2.default.find({ patient: patientUsername }).exec();
        // Use a Set to keep track of unique doctor usernames
        const uniqueDoctorNamesSet = new Set();
        // Add each doctor name to the Set
        appointments.forEach(appointment => {
            if (appointment.doctor) {
                uniqueDoctorNamesSet.add(appointment.doctor);
            }
        });
        // Convert Set back to an array
        const uniqueDoctorNames = Array.from(uniqueDoctorNamesSet);
        res.status(200).json(uniqueDoctorNames);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPatientDocNames = getPatientDocNames;
//VIEW PAST APPOINTMENTS
const viewPastAppointments = async (req, res) => {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = await appointmentModel_2.default.find({
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
};
exports.viewPastAppointments = viewPastAppointments;
//VIEW UPCOMING APPOINTMENTS
const viewUpcomingAppointments = async (req, res) => {
    try {
        const patientUsername = req.query.patientUsername;
        const appointments = await appointmentModel_2.default.find({
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
};
exports.viewUpcomingAppointments = viewUpcomingAppointments;
// FILTER APPOINTMENTS BY DATE
const getAppointmentByDate = async (req, res) => {
    const patientUsername = req.query.patientUsername;
    const date = req.query.date;
    const appointments = await appointmentModel_2.default.find({
        patient: patientUsername,
        date: date,
    }).exec();
    res.status(200).json({ appointments });
};
exports.getAppointmentByDate = getAppointmentByDate;
//FILTER APPOINTMENTS BY STATUS
const getAppointmentByStatus = async (req, res) => {
    const patientUsername = req.query.patientUsername;
    const status = req.query.status;
    const appointments = await appointmentModel_2.default.find({
        patient: patientUsername,
        status: status,
    }).exec();
    res.status(200).json({ appointments });
};
exports.getAppointmentByStatus = getAppointmentByStatus;
//HEALTH RECORD
//VIEW MY HEALTH RECORD (ONE AND ONLY)
const viewMyHealthRecord = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tokenDB = await tokenModel_1.default.findOne({ token });
    console.log(token);
    console.log(tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username);
    const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    try {
        const healthRecord = await healthRecordModel_1.default.findOne({
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
};
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
const logout = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("SECRET_ACCESS_TOKEN is not defined in the environment.");
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token is not valid" });
            }
            const tokenDB = await tokenModel_1.default.findOneAndDelete({ token: token });
            res.json(tokenDB);
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
};
exports.logout = logout;
const changePassword = async (req, res) => {
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
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token is not valid" });
            }
            const tokenDB = await tokenModel_1.default.findOne({ token });
            if (!tokenDB) {
                return res.status(404).json({ message: "Token not found" });
            }
            const patient = await patientModel_1.default.findOne({
                username: tokenDB.username,
            });
            if (!patient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            const isPasswordValid = await bcrypt_1.default.compare(currentPassword, patient.password);
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
            const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
            patient.password = hashedNewPassword;
            await patient.save();
            return res
                .status(200)
                .json({ message: "Password changed successfully" });
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
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
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const tokenDB = await tokenModel_1.default.findOne({ token });
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
    });
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
const linkFamilyMember = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
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
        const patient = await patientModel_1.default.findOne({ username: patientUsername });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        let familyMember;
        if (familyMemberData.startsWith("01")) {
            familyMember = await patientModel_1.default.findOne({
                mobilenumber: familyMemberData,
            });
        }
        else {
            familyMember = await patientModel_1.default.findOne({ email: familyMemberData });
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
        await patient.save();
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
};
exports.linkFamilyMember = linkFamilyMember;
const viewWalletAmount = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const patient = await patientModel_2.default.findOne({ username }).exec();
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
};
exports.viewWalletAmount = viewWalletAmount;
const uploadPatintDocs = async (req, res) => {
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
            const tokenDB = await tokenModel_1.default.findOne({ token: token });
            var username;
            if (tokenDB) {
                username = tokenDB.username;
            }
            else {
                return res.status(404).json({ error: "username not found" });
            }
            const healthRecord = await healthRecordModel_1.default.findOne({
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
            await healthRecord.save();
            res.json({ message: "Documents uploaded successfully." });
        }
    }
    catch (error) {
        console.error("Error handling file upload:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
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
const deletePatientDocs = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const healthRecord = await healthRecordModel_1.default.findOne({ patient: username });
        const { section, subsection } = req.query;
        const { path } = req.body;
        if (!healthRecord) {
            return res.status(404).json({
                message: "Health record not found for the specified patient.",
            });
        }
        console.log(healthRecord);
        if (section == "MedicationList" && subsection == "CurrentMedications") {
            if ((_a = healthRecord.MedicationList) === null || _a === void 0 ? void 0 : _a.CurrentMedications) {
                const updatedPrescriptions = (_c = (_b = healthRecord.MedicationList) === null || _b === void 0 ? void 0 : _b.CurrentMedications) === null || _c === void 0 ? void 0 : _c.Prescriptions.filter((prescription) => prescription !== path);
                if (updatedPrescriptions !== undefined) {
                    healthRecord.MedicationList.CurrentMedications.Prescriptions =
                        updatedPrescriptions;
                }
            }
        }
        else if (section == "MedicationList" && subsection == "PastMedications") {
            if ((_d = healthRecord.MedicationList) === null || _d === void 0 ? void 0 : _d.PastMedications) {
                const updatedPrescriptions = (_f = (_e = healthRecord.MedicationList) === null || _e === void 0 ? void 0 : _e.PastMedications) === null || _f === void 0 ? void 0 : _f.Prescriptions.filter((prescription) => prescription !== path);
                if (updatedPrescriptions !== undefined) {
                    healthRecord.MedicationList.PastMedications.Prescriptions =
                        updatedPrescriptions;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "BloodTests") {
            if ((_g = healthRecord.Laboratory) === null || _g === void 0 ? void 0 : _g.BloodTests) {
                const updated = (_j = (_h = healthRecord.Laboratory) === null || _h === void 0 ? void 0 : _h.BloodTests) === null || _j === void 0 ? void 0 : _j.filter((prescription) => prescription !== path);
                if (updated !== undefined) {
                    healthRecord.Laboratory.BloodTests = updated;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "XRays") {
            if ((_k = healthRecord.Laboratory) === null || _k === void 0 ? void 0 : _k.XRays) {
                const updated = (_m = (_l = healthRecord.Laboratory) === null || _l === void 0 ? void 0 : _l.XRays) === null || _m === void 0 ? void 0 : _m.filter((prescription) => prescription !== path);
                if (updated !== undefined) {
                    healthRecord.Laboratory.XRays = updated;
                }
            }
        }
        else if (section == "Laboratory" && subsection == "Other") {
            if ((_o = healthRecord.Laboratory) === null || _o === void 0 ? void 0 : _o.Other) {
                const updated = (_q = (_p = healthRecord.Laboratory) === null || _p === void 0 ? void 0 : _p.Other) === null || _q === void 0 ? void 0 : _q.filter((prescription) => prescription !== path);
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
        await healthRecord.save();
        res.json({ message: "Document removed successfully." });
    }
    catch (error) {
        console.error("Error handling file remove:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.deletePatientDocs = deletePatientDocs;
const rescheduleAppointments = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
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
        const appointment = await appointmentModel_1.default.findById(appointmentId);
        if (appointment) {
            const rescheduledAppointment = await appointmentModel_2.default.create({
                status: "rescheduled",
                doctor: appointment.doctor,
                patient: appointment.patient,
                date: newDate,
                scheduledBy: username,
                type: appointment.type
            });
            const doctor = await doctorModel_2.default.findOne({
                username: appointment.doctor,
            });
            if (doctor) {
                doctor.timeslots.push({ date: appointment.date });
                // await doctor.save();
                doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date && timeslot.date.getTime() !== newDate.getTime());
                notificationText = `Your appointment has been rescheduled for ${new Date(date)}. 
                      Doctor: ${doctor.username}`;
                await doctor.save();
                appointment.status = "cancelled";
                const updatedAppointment = await appointment.save();
                res.status(200).json({ rescheduledAppointment });
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
};
exports.rescheduleAppointments = rescheduleAppointments;
const viewFamAppointments = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const patient = await patientModel_2.default.findOne({ username: username }).lean();
        if (patient) {
            const familyMembers = patient.familyMembers;
            const familyMemberUsernames = familyMembers.map((member) => member.username);
            const appointments = await appointmentModel_1.default.find({
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
};
exports.viewFamAppointments = viewFamAppointments;
const getTodayAppointments = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tokenDB = await tokenModel_1.default.findOne({ token });
    console.log(token);
    const patientUsername = tokenDB === null || tokenDB === void 0 ? void 0 : tokenDB.username;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day
    const appointments = await appointmentModel_1.default
        .find({
        patient: patientUsername,
        date: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        }, // Filter for today's appointments
    })
        .exec();
    res.status(200).json(appointments);
};
exports.getTodayAppointments = getTodayAppointments;
//send Request Follow up to doctor
const sendRequestFollowUp = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const tokenDB = await tokenModel_1.default.findOne({ token: token });
        var username;
        if (tokenDB) {
            username = tokenDB.username;
        }
        else {
            return res.status(404).json({ error: "username not found" });
        }
        const { Appointmentstatus, doctor, patient, AppointmentDate, type, price, paid, scheduledBy, followUpDate } = req.body;
        const followUpRequest = await requestModel_1.default.create({
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
};
exports.sendRequestFollowUp = sendRequestFollowUp;
// export const getAllPrescriptionsForPatient = async (req: Request, res: Response) => {
//   try {
//      const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const tokenDB = await tokenModel.findOne({ token });
//     const patientUsername = tokenDB && tokenDB.username;
//     if (!patientUsername) {
//       return res.status(400).json({ error: 'Patient username is required' });
//     }
//     const prescriptions = await prescriptionModel.find({ patientUsername });
//     return res.status(200).json({ prescriptions });
//   } catch (error) {
//     console.error('Error getting prescriptions for patient:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
// export const getPrescriptionDetails = async (req: Request, res: Response) => {
//   try {
//     const { prescriptionId } = req.body;
//     if (!prescriptionId) {
//       return res.status(400).json({ error: 'Prescription ID is required' });
//     }
//     const prescription = await prescriptionModel.findById(prescriptionId);
//     if (!prescription) {
//       return res.status(404).json({ error: 'Prescription not found' });
//     }
//     return res.status(200).json({ prescription });
//   } catch (error) {
//     console.error('Error getting prescription details:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
const calcPatientAge = async (req, res) => {
    const username = req.body.username;
    try {
        // Find the patient by username
        const patient = await patientModel_1.default.findOne({ username }).exec();
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Get the date of birth from the patient
        const dateOfBirth = patient.dateofbirth;
        if (!dateOfBirth) {
            return res.status(400).json({ error: 'Date of birth not available for the patient' });
        }
        // Calculate the age
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        // Adjust age if the birthday hasn't occurred yet this year
        const todayMonth = today.getMonth();
        const birthDateMonth = birthDate.getMonth();
        if (todayMonth < birthDateMonth || (todayMonth === birthDateMonth && today.getDate() < birthDate.getDate())) {
            age--;
        }
        // Send the age in the response
        res.status(200).json({ age });
    }
    catch (error) {
        console.error('Error calculating patient age:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.calcPatientAge = calcPatientAge;
