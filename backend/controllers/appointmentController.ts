import { Request, Response } from "express";
import AppointmentModel from "../models/appointmentModel";


export const createAppointment = async (req: Request, res: Response) => {
    const doctorUsername = req.body.doctor;
    const patientUsername = req.body.patient;
    const date = req.body.date;
    const status = req.body.status;
    
    const appoinment = await AppointmentModel.create({
        status: status,
        doctor: doctorUsername,
        patient: patientUsername,
        date: date
    });
    res.status(201).json(appoinment);
    
};

export const getAppointments = async (req: Request, res: Response) => { 
    const doctorUsername = req.query.doctorUsername;
    const appoinments = await AppointmentModel.find({doctor: doctorUsername}).exec();
    res.status(200).json(appoinments);
}

export const getAllAppointments = async (req: Request, res: Response) =>{
    const appoinments = await AppointmentModel.find().exec();
    res.json(appoinments);
}