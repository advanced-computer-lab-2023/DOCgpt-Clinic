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
exports.localVariables = exports.getPapp = exports.getAllAppointments = exports.getAppointments = exports.createAppointment = void 0;
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel")); // Import your Doctor model
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorUsername = req.body.doctor;
    const patientId = req.query.patientId;
    const date = req.body.date;
    const status = req.body.status;
    const type = 'new appointment';
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
            const appointment = yield appointmentModel_1.default.create({
                status: status,
                doctor: doctorUsername,
                patient: patientId,
                date: new Date(date),
                type: type
            });
            return res.status(201).json(appointment);
        }
        else {
            return res.status(404).json({ message: 'Doctor not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
});
exports.createAppointment = createAppointment;
// export const createAppointment = async (req: Request, res: Response) => {
//     const doctorUsername = req.body.doctor;
//     const patientUsername = req.body.patient;
//     const date = req.body.date;
//     const status = req.body.status;
//     try {
//         // Find the doctor by username
//         const doctor: IDoctor | null = await DoctorModel.findOne({ username: doctorUsername }).exec();
//         if (doctor) {
//             // Remove the time slot from the doctor's timeslots
//             console.log('Before removing timeslot:', doctor.timeslots);
//             const newDate = new Date(date);
//             doctor.timeslots = doctor.timeslots.filter((timeslot) => timeslot.date.getTime() !== newDate.getTime());
//             console.log('After removing timeslot:', doctor.timeslots);
//             // Save the updated doctor
//             await doctor.save();
//             // Create the appointment
//             const appointment = await AppointmentModel.create({
//                 status: status,
//                 doctor: doctorUsername,
//                 patient: patientUsername,
//                 date: new Date(date), // Convert date to Date object
//             });
//             return res.status(201).json(appointment);
//         } else {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'An error occurred', error });
//     }
// };
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
const getPapp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const appoinments = yield appointmentModel_1.default.find({ patient: username }).exec();
    res.status(200).json(appoinments);
});
exports.getPapp = getPapp;
const localVariables = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
});
exports.localVariables = localVariables;
