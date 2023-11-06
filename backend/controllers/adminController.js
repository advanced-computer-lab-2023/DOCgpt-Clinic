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
exports.verifyTokenAdmin = exports.changePassword = exports.logout = exports.loginAdmin = exports.createToken = exports.getPackageNAME = exports.getPackage = exports.getdoctorsR = exports.getPatients = exports.getAdmins = exports.updatePackage = exports.deletePackageByName = exports.addPackage = exports.viewDoctorInfo = exports.deletePatientBySmsomaa = exports.deletePatientByrota = exports.deletePatientByUsername = exports.deleteDoctorByUsername = exports.deleteAdminByUsername = exports.addAdmin = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const packageModel_1 = __importDefault(require("../models/packageModel")); // Import your package model
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const usernameExists = yield patientModel_1.default.findOne({ username });
    const usernameExists2 = yield doctorModel_1.default.findOne({ username });
    const usernameExists3 = yield adminModel_1.default.findOne({ username });
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
    try {
        const admin = yield adminModel_1.default.create({ username, password: hash });
        res.status(200).json(admin);
    }
    catch (error) {
        const err = error; // Type assertion to specify the type as 'Error'
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
const deletePatientByrota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deletePatientByrota = deletePatientByrota;
const deletePatientBySmsomaa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deletePatientBySmsomaa = deletePatientBySmsomaa;
const viewDoctorInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username) {
            res.status(400).json({ message: 'Username is required' });
            return;
        }
        // Find the doctor by username
        const doctor = yield doctorModel_1.default.findOne({ username });
        if (!doctor) {
            res.status(404).json({ message: 'Doctor not found' });
        }
        else {
            res.status(200).json({ doctor });
        }
    }
    catch (error) {
        // Handle any errors here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.viewDoctorInfo = viewDoctorInfo;
// add a package
const addPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, feesPerYear, doctorDiscount, medicineDiscount, familysubscribtionDiscount } = req.body;
        // Ensure all required fields are provided and validated here
        if (!name || !feesPerYear || !doctorDiscount || !medicineDiscount || !familysubscribtionDiscount) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const newPackage = yield packageModel_1.default.create({
            name,
            feesPerYear,
            doctorDiscount,
            medicineDiscount,
            familysubscribtionDiscount,
        });
        yield newPackage.save();
        return res.status(201).json({ message: 'Package added successfully', package: newPackage });
    }
    catch (error) {
        console.error('Error adding package:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addPackage = addPackage;
//delete package
const deletePackageByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Find and delete the admin by username
        const deletedPackage = yield packageModel_1.default.findOneAndDelete({ name });
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json({ message: 'Package deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deletePackageByName = deletePackageByName;
// update Package
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, newname, feesPerYear, doctorDiscount, PackageDiscount, familysubscribtionDiscount } = req.body;
    try {
        // Find the Package by its name and update it
        const updatedPackage = yield packageModel_1.default.findOneAndUpdate({ name: name }, req.body, { new: true });
        // Check if the Package exists
        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        // Return the updated Package
        res.status(200).json(updatedPackage);
    }
    catch (error) {
        console.error('Error updating Package:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updatePackage = updatePackage;
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
//get patients
const getPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const patients = yield patientModel_1.default.find();
        res.json({ patients });
    }
    catch (error) {
        // Handle any errors here
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getPatients = getPatients;
//getdoctors
const getdoctorsR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const doctors = yield doctorModel_1.default.find();
        res.json({ doctors });
    }
    catch (error) {
        // Handle any errors here
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getdoctorsR = getdoctorsR;
const getPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all users from the database
        const packages = yield packageModel_1.default.find();
        res.json({ packages });
    }
    catch (error) {
        // Handle any errors here
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getPackage = getPackage;
const getPackageNAME = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all packages from the database
        const packages = yield packageModel_1.default.find({}, 'name'); // Retrieve only the 'name' field
        const packageNames = packages.map((pkg) => pkg.name);
        res.json({ packageNames });
    }
    catch (error) {
        // Handle any errors here
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getPackageNAME = getPackageNAME;
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
// create token
const createToken = (_id) => {
    console.log("dkhlt hena");
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('SECRET_ACCESS_TOKEN is not defined in the environment.');
    }
    const token = jsonwebtoken_1.default.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });
    return token;
};
exports.createToken = createToken;
//login admin
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({ message: 'all fields must be filled' });
        }
        const admin = yield adminModel_1.default.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'invalid username' });
        }
        const match = yield bcrypt_1.default.compare(password, admin.password);
        if (!match) {
            return res.status(401).json({ message: 'invalid password' });
        }
        const token = (0, exports.createToken)(admin.id);
        const tokenn = yield tokenModel_1.default.create({ token, username, role: 'admin' });
        res.status(200).json({ admin, token });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ error: err.message });
    }
});
exports.loginAdmin = loginAdmin;
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
            const admin = yield adminModel_1.default.findOne({ username: tokenDB.username });
            if (!admin) {
                return res.status(404).json({ message: 'admin not found' });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(currentPassword, admin.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            // Validate the new password using the validatePassword function
            if (!validatePassword(newPassword)) {
                return res.status(400).json({ message: 'Invalid new password' });
            }
            // Hash and update the new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            admin.password = hashedNewPassword;
            yield admin.save();
            return res.status(200).json({ message: 'Password changed successfully' });
        }));
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
const verifyTokenAdmin = (req, res, next) => {
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
            if (tokenDB.role === 'admin') {
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
exports.verifyTokenAdmin = verifyTokenAdmin;
