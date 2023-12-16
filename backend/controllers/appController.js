"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.SendResetmail = exports.verifyOTP = exports.generateOTP = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = require("./nodemailer");
const patientModel_1 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateOTP = async (req, res) => {
    const OTP = await otp_generator_1.default.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    req.app.locals.OTP = OTP;
    // res.status(201).json({ code: OTP });
};
exports.generateOTP = generateOTP;
const verifyOTP = async (req, res) => {
    const code = req.query.code;
    if (parseInt(req.app.locals.OTP) === parseInt(code + '')) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully!' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
};
exports.verifyOTP = verifyOTP;
const SendResetmail = async (req, res) => {
    const email = req.body.email;
    const isValidMail = validateEmail(email);
    if (!isValidMail) {
        return res.status(400).send({ error: 'Please enter a correct Gmail' });
    }
    const usernameExists = await patientModel_1.default.findOne({ email });
    const usernameExists2 = await doctorModel_1.default.findOne({ email });
    const usernameExists3 = await adminModel_1.default.findOne({ email });
    var user;
    if (!usernameExists && !usernameExists2 && !usernameExists3) {
        return res.status(404).send({ error: 'No user with this email' });
    }
    if (usernameExists) {
        user = await patientModel_1.default.findOne({ email });
    }
    else if (usernameExists2) {
        user = await doctorModel_1.default.findOne({ email });
    }
    else {
        user = await adminModel_1.default.findOne({ email });
    }
    const username = user === null || user === void 0 ? void 0 : user.username;
    const OTP = await otp_generator_1.default.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    req.app.locals.OTP = OTP;
    req.app.locals.name = username;
    console.log(OTP);
    const text = `Your OTP is: ${OTP}`;
    const subject = 'Reset Forgotten Password';
    const sent = await (0, nodemailer_1.sendAnEmail)(email, subject, text);
    res.json({ message: 'OTP sent successfully' });
};
exports.SendResetmail = SendResetmail;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const resetPassword = async (req, res) => {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const username = req.app.locals.name;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        let user;
        const doctor = await doctorModel_1.default.findOne({ username: username });
        const patient = await patientModel_1.default.findOne({ username: username });
        const admin = await adminModel_1.default.findOne({ username: username });
        if (doctor) {
            user = doctor;
        }
        else if (admin) {
            user = admin;
        }
        else {
            user = patient;
        }
        if (!user) {
            throw Error('No user found');
        }
        req.app.locals.name = "null";
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }
        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Invalid new password' });
        }
        // Hash and update the new password
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword + '', 10);
        user.password = hashedNewPassword;
        await user.save();
        req.app.locals.resetSession = false;
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.resetPassword = resetPassword;
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
