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
exports.selectDoctors = exports.searchDoctors = exports.getDoctorDetails = exports.filterDoctors = exports.getDoctor = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const appointmentModel_1 = __importDefault(require("../models/appointmentModel"));
const mongoose = require('mongoose');
// export const getDoctor = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const doctors = await Doctor.find({}, 'name speciality hourlyRate');
//     doctors.forEach((doctor: any) => {
//     const doctorsWithSessionPrice = doctors.map((doctor: any) => {
//       const hourlyRate = doctor.hourlyRate;
//       const sessionPrice = (hourlyRate + 0.1 * 50) - 0.5;
//       return { ...doctor.toObject(), sessionPrice };
//     });
//     res.status(200).json(doctorsWithSessionPrice);
//   });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_1.default.find({}, 'name speciality hourlyRate');
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
        doctors = yield doctor_1.default.find({ speciality: speciality }).exec();
    }
    else {
        doctors = yield doctor_1.default.find();
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
// export const filterDoctors = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { specialty, date, time } = req.query as { specialty: string; date: string; time: string };
//     const query: any = {};
//     if (specialty) {
//       query.specialty = { $regex: new RegExp(specialty, 'i') };
//     }
//     if (date && time) {
//       const doctors = await Doctor.find(query);
//       const availableDoctors = await Promise.all(
//         doctors.map(async (doctor) => {
//           const appointmentExists = await Appointment.exists({
//             doctor: doctor._id,
//             date: new Date(date),
//             time,
//           });
//           return appointmentExists ? null : doctor;
//         })
//       );
//       const filteredDoctors = availableDoctors.filter((doctor) => doctor !== null) as any[];
//       if (filteredDoctors.length === 0) {
//         res.status(404).json({ message: 'No doctors found' });
//         return;
//       }
//       const doctorsWithSessionPrice = filteredDoctors.map((doctor) => {
//         const hourlyRate = doctor.hourlyRate;
//         const sessionPrice = (hourlyRate + 0.1) - 0.5;
//         return { ...doctor.toObject(), sessionPrice };
//       });
//       res.status(200).json(doctorsWithSessionPrice);
//     } else {
//       const doctors = await Doctor.find(query, 'name specialty hourlyRate');
//       if (doctors.length === 0) {
//         res.status(404).json({ message: 'No doctors found' });
//         return;
//       }
//       const doctorsWithSessionPrice = doctors.map((doctor) => {
//         const hourlyRate = doctor.hourlyRate;
//         const sessionPrice = (hourlyRate + 0.1) - 0.5;
//         return { ...doctor.toObject(), sessionPrice };
//       });
//       res.status(200).json(doctorsWithSessionPrice);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
//
const getDoctorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.query;
        const doctor = yield doctor_1.default.findById(_id);
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
//check clinic markup and health package discount
//doctors.forEach((doctor: any) => {
// sessionPrice = (doctor.hourlyRate + 0.1 * 50) - 0.5;
//});
// res.status(200).json(doctors);
// } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//       }
// };
// export default {
//   getDoctor
// };
// export const searchDoctors = async(req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, speciality } = req.query;
//     const query: any = {};
//     if (name) {
//       query.name = { $regex: name, $options: 'i' };
//     }
//     if (speciality) {
//       query.speciality = { $regex: speciality, $options: 'i' };
//     }
//     const doctors = await Doctor.find(query);
//     if (!doctors) {
//       res.status(404).json({ error: 'Doctor not found' });
//       return;
//     }
//     res.status(200).json(doctors);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while searching for doctors' });
//   }
// }
// export const searchDoctors = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, speciality } = req.query;
//     const query: any = {};
//     if (name) {
//       query.name = { $regex: new RegExp(name , 'i') };
//     }
//     if (speciality) {
//       query.speciality = { $regex: new RegExp(speciality, 'i') };
//     }
//     const doctors = await Doctor.find(query);
//     if (doctors.length === 0) {
//       res.status(404).json({ error: 'No doctors found' });
//       return;
//     }
//     res.status(200).json(doctors);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while searching for doctors' });
//   }
// };
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
        const doctors = yield doctor_1.default.find(query);
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
//
const selectDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.query;
        const doctor = yield doctor_1.default.findById(_id);
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
module.exports = {
    getDoctor: exports.getDoctor,
    searchDoctors: exports.searchDoctors,
    selectDoctors: exports.selectDoctors,
    filterDoctors: exports.filterDoctors,
    getDoctorDetails: exports.getDoctorDetails
};
// const createDocList = async(req: Request, res: Response) => {
//     const {speciality, sessionDiscount} : {speciality: String; sessionDiscount: Number} = req.body
//     try{
//         const doctor = await Doctor.create({speciality, sessionDiscount})
//         res.status(200).json(doctor)
//     }catch (error : any){
//         res.status(400).json({error: error.message})
//     }
// }
// // function calculateSessionPrice(doctor: any, patient: any): number {
// //     const clinicMarkup = doctor.clinic.markup;
// //     const patientDiscount = patient.healthPackageDiscount.sessionDiscount;
// //     return doctor.hourlyRate + clinicMarkup * 0.1 - patientDiscount;
// //   }
// // import { Request, Response } from 'express';
// // import Doctor from '../models/doctor';
// // import Patient from '../models/patient';
// // export const getDoctors = async (req: Request, res: Response) => {
// //   try {
// //     const doctors = await Doctor.find().select('speciality', '');
// //     res.json(doctors);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };
// // export const getDoctors = async (req: Request, res: Response) => {
// //     // Get all doctors from the database
// //     const doctors = await Doctor.find();
// //     // Calculate the session price for each doctor
// //     doctors.forEach((doctor) => {
// //       doctor.sessionPrice = calculateSessionPrice(doctor, Patient);
// //     });
// //     // Return a list of doctors to the client
// //     res.json(doctors);
// //   };
// export default {
//     createDocList,
//       //getDoctors
//     };
