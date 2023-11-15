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
exports.resetPassword = exports.SendResetmail = exports.verifyOTP = exports.generateOTP = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = require("./nodemailer");
const patientModel_1 = __importDefault(require("../models/patientModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OTP = yield otp_generator_1.default.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    req.app.locals.OTP = OTP;
    // res.status(201).json({ code: OTP });
});
exports.generateOTP = generateOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (parseInt(req.app.locals.OTP) === parseInt(code + '')) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: 'Verify Successfully!' });
    }
    return res.status(400).send({ error: 'Invalid OTP' });
});
exports.verifyOTP = verifyOTP;
const SendResetmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const isValidMail = validateEmail(email);
    if (!isValidMail) {
        return res.status(400).send({ error: 'Please enter a correct Gmail' });
    }
    const usernameExists = yield patientModel_1.default.findOne({ email });
    const usernameExists2 = yield doctorModel_1.default.findOne({ email });
    const usernameExists3 = yield adminModel_1.default.findOne({ email });
    if (!usernameExists && !usernameExists2 && !usernameExists3) {
        return res.status(404).send({ error: 'No user with this email' });
    }
    const OTP = yield otp_generator_1.default.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    req.app.locals.OTP = OTP;
    console.log(OTP);
    const text = `Your OTP is: ${OTP}`;
    const subject = 'Reset Forgotten Password';
    const sent = yield (0, nodemailer_1.sendOTPByEmail)(email, subject, text);
    res.json({ message: 'OTP sent successfully' });
});
exports.SendResetmail = SendResetmail;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const username = req.body.username;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        let user;
        const doctor = yield doctorModel_1.default.findOne({ username: username });
        const patient = yield patientModel_1.default.findOne({ username: username });
        const admin = yield adminModel_1.default.findOne({ username: username });
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
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }
        if (!validatePassword(newPassword)) {
            return res.status(400).json({ message: 'Invalid new password' });
        }
        // Hash and update the new password
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword + '', 10);
        user.password = hashedNewPassword;
        yield user.save();
        req.app.locals.resetSession = false;
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
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
