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
exports.getAllAppointments = exports.getAppointments = exports.createAppointment = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.body.doctor;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = req.body.status;
    const appoinment = yield appointmentModel_1.default.create({
        status: status,
        doctor: doctorUsername,
        patient: patientUsername,
        date: date
    });
    res.status(201).json(appoinment);
});
exports.createAppointment = createAppointment;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.query.doctorUsername;
    const appoinments = yield appointmentModel_1.default.find({ doctor: doctorUsername }).exec();
    res.status(200).json(appoinments);
});
exports.getAppointments = getAppointments;
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appoinments = yield appointmentModel_1.default.find().exec();
    res.json(appoinments);
});
exports.getAllAppointments = getAllAppointments;
