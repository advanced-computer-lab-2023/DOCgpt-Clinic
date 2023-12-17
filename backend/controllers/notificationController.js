"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getCountD = exports.getCountP = exports.getNotificationsD = exports.getNotificationsP = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const notificationModel_2 = __importDefault(require("../models/notificationModel"));
const getNotificationsP = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notifications = await notificationModel_1.default.find({ patientUsername: username });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getNotificationsP = getNotificationsP;
const getNotificationsD = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const doctor = await doctorModel_1.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notifications = await notificationModel_1.default.find({ patientUsername: username });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getNotificationsD = getNotificationsD;
const getCountP = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const patient = await patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notificationsCount = await notificationModel_1.default.countDocuments({ patientUsername: username, read: false });
        res.json({ notificationsCount });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountP = getCountP;
const getCountD = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = await tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const doctor = await doctorModel_1.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notificationsCount = await notificationModel_1.default.countDocuments({ patientUsername: username, read: false });
        res.json({ notificationsCount });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountD = getCountD;
const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.body;
        // Check if the prescription ID is provided
        if (!notificationId) {
            return res.status(400).json({ error: 'notification ID is required.' });
        }
        // Find the prescription by ID
        const notification = await notificationModel_2.default.findById(notificationId);
        // Check if the prescription exists
        if (!notification) {
            return res.status(404).json({ error: 'notification not found.' });
        }
        // Update the prescription status
        if (notification.read == false) {
            notification.read = true;
        }
        // Save the updated prescription
        await notification.save();
        // Respond with the updated prescription
        res.json({ message: 'notification status updated successfully.', notification });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.markAsRead = markAsRead;