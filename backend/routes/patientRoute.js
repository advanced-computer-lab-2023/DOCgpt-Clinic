"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/doctorRoutes.ts
const express_1 = __importDefault(require("express"));
//import { Doctor } from '../models/doctor';
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const { getDoctor, searchDoctors, selectDoctors, filterDoctors, getDoctorDetails } = require('../controllers/patientController');
const router = express_1.default.Router();
router.get('/doctors', getDoctor);
//router.get('/doctors', searchDoctors);
//router.get('/doctors/:name', searchDoctors);
//router.get('/doctors/:speciality', searchDoctors);
router.get('/doctors/search', searchDoctors);
router.get('/doctors/filter', filterDoctors);
//router.get('/doctors/:doctorId', getDoctorDetails);
router.get('/doctors/view', getDoctorDetails);
router.get('/doctors/select', selectDoctors);
//router.post('/doctors/:doctorId/select', selectDoctors);
exports.default = router;
// // import express, { Request, Response, Router } from 'express';
// // const Doctor = require('../models/doctor') ;
// // const Patient = require('../models/patient') ;
// const {
//     createDocList
//     //getDoctors
// } = require('../controllers/patientController')
// // const router: Router = express.Router();
// // //view a list of doctors
// // router.get('/', getDoctor)
// // export default router;
// import express, { Request, Response } from 'express';
// //import Doctor from '../models/doctor';
// const router = express.Router();
// router.get('/', createDocList)
// // router.get('/doctors', async (req: Request, res: Response) => {
// //   try {
// //     const doctors = await Doctor.find().select('affiliation');
// //     res.json(doctors);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });
// export default router;
