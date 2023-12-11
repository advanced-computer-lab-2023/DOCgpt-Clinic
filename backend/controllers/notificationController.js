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
exports.getCountD = exports.getCountP = exports.getNotificationsD = exports.getNotificationsP = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const patientModel_1 = __importDefault(require("../models/patientModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const getNotificationsP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notifications = yield notificationModel_1.default.find({ patientUsername: username });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getNotificationsP = getNotificationsP;
const getNotificationsD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const doctor = yield doctorModel_1.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notifications = yield notificationModel_1.default.find({ patientUsername: username });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getNotificationsD = getNotificationsD;
const getCountP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const patient = yield patientModel_1.default.findOne({ username });
        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notificationsCount = yield notificationModel_1.default.countDocuments({ patientUsername: username });
        res.json({ notificationsCount });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getCountP = getCountP;
const getCountD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const tokenDB = yield tokenModel_1.default.findOne({ token });
        if (!tokenDB) {
            return res.status(404).json({ error: 'User not found' });
        }
        const username = tokenDB.username;
        const doctor = yield doctorModel_1.default.findOne({ username });
        if (!doctor) {
            return res.status(404).json({ error: 'User not found' });
        }
        const notificationsCount = yield notificationModel_1.default.countDocuments({ patientUsername: username });
        res.json({ notificationsCount });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getCountD = getCountD;
