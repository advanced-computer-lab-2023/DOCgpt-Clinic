import { Request, Response } from "express";
import multer from 'multer';
import path from 'path';
import DoctorModel, { IDoctor } from "../models/doctorModel";
import AppointmentModel from "../models/appointmentModel";
import PatientModel from "../models/patientModel";
import HealthRecordModel from "../models/healthRecordModel";

export const getDoctors = async (req: Request, res: Response) => {
    const doctors = await DoctorModel.find().exec();
    res.status(200).json(doctors);
};

export const getDoctor = async (req: Request, res: Response) => {

    const doctorUsername = req.query.doctorUsername;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    console.log(doctor)
    res.status(200).json(doctor);
};

export const searchPatient = async (req: Request, res: Response) => {
    const patientName = String(req.query.patientName);
    // find by the full name
    // const patient = await PatientModel.find({ name: patientName }).exec();
    // res.status(200).json(patient);

    // find by just the substring
    const patients = await PatientModel.find().exec();
    const matchingPatients = patients.filter((patient) =>
        patient.name.includes(patientName)
    );
    res.json(matchingPatients);
}

export const createDoctors = async (req: Request, res: Response) => {
    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dateOfBirth = req.body.dateOfBirth;
    const hourlyRate = req.body.hourlyRate;
    const affiliation = req.body.affiliation;
    const speciality = req.body.speciality;
    const educationalBackground = req.body.educationalBackground;
    
    const doctor = await DoctorModel.create({
        username: username,
        name: name,
        email: email,
        password: password,
        dateOfBirth: dateOfBirth,
        hourlyRate: hourlyRate,
        affiliation: affiliation,
        speciality: speciality,
        educationalBackground: educationalBackground,
        
    });
    res.status(201).json(doctor);
    
};

export const updateDoctorEmail = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newEmail = req.body.email;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.email = newEmail;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const updateDoctorHourlyRate = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newRate = req.body.hourlyRate;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.hourlyRate = newRate;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const updateDoctorAffiliation = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const newAffiliation = req.body.affiliation;
    const doctor = await DoctorModel.findOne({username: doctorUsername}).exec();
    if(doctor!=null){
        doctor.affiliation = newAffiliation;
        const updatedDoctor = await doctor.save();
        res.status(200).json(updatedDoctor);
    }
};

export const viewMyPatients = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername }).exec();
    const patients: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = await PatientModel.findOne({ username: username}).exec();
        if(!usernames.includes(username)){
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
    // res.status(200).json(patients);
};

export const viewPatientsUpcoming = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername , status: "upcoming"}).exec();
    const patients: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = await PatientModel.findOne({ username: username}).exec();
        if(!usernames.includes(username)){
            patients.push({date: appoinment.date});
            patients.push(patient);
            usernames.push(username);
        }
    }
    res.status(200).json(patients);
};

export const getAppointmentByDate = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const date = req.query.date;
    const appoinments = await AppointmentModel.find({ doctor: doctorUsername, date: date}).exec();
    res.status(200).json(appoinments);
};

export const getAppointmentByStatus = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const status = req.query.status;
    const appoinments = await AppointmentModel.find({ doctor: doctorUsername, status: status}).exec();
    res.status(200).json(appoinments);
};

export const selectPatient = async (req: Request, res: Response) => {
    const patientId = req.query.patientId;
    const patient = await PatientModel.findById(patientId);
    res.status(200).json(patient);
};

export const viewHealthRecords = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const appointments = await AppointmentModel.find({ doctor: doctorUsername}).exec();
    const healthRecords: any[] = []; 
    const usernames: any[] = [];
    for (const appoinment of appointments) {
        const username = appoinment.patient;
        const patient = await PatientModel.findOne({ username: username }).exec();
        console.log(patient);
        
        if(patient!=null){
            const patientId = patient._id;
            console.log(patientId);
            
            const healthRecord = await HealthRecordModel.findOne({ patientId: patientId}).populate('patientId').exec();
            if(!usernames.includes(username)){
                healthRecords.push(healthRecord);
                usernames.push(username);
            }
        }
    }
    res.status(200).json(healthRecords);
};

export const addTimeSlots = async (req: Request, res: Response) => {
    const doctorUsername = req.query.doctorUsername;
    const { dates } = req.body;

    try {
        // Find the doctor by username
        const doctor: IDoctor | null = await DoctorModel.findOne({ username: doctorUsername }).exec();

        if (doctor) {
            // Use push to add new time slots to the existing array
            dates.forEach((date: Date) => {
                doctor.timeslots.push({ date });
            });

            // Save the updated doctor
            const updatedDoctor = await doctor.save();

            res.status(200).json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
export const viewHealthRecord = async (req: Request, res: Response) => {
    const patientId = req.query.patientId;
    const healthRecord = await HealthRecordModel.findById(patientId);
    res.status(200).json(healthRecord);
};  

export const createfollowUp = async (req: Request, res: Response) => {
    const doctorUsername = req.body.doctor;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = req.body.status;
    const type=req.body.type;
    
    const appoinment = await AppointmentModel.create({
        status: status,
        doctor: doctorUsername,
        patient: patientUsername,
        date: date,
        type:type
    });
    res.status(201).json(appoinment);
    
};